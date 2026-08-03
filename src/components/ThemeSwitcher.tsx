"use client";

import { useCallback, useState, useSyncExternalStore } from "react";

/**
 * EXPERIMENTAL — a temporary palette picker for trying themes out.
 *
 * Sets a data-theme attribute on <html>; the palettes themselves are CSS
 * variable overrides at the bottom of globals.css, so nothing here knows
 * anything about colours.
 *
 * To remove: delete this file, drop the <ThemeSwitcher /> line from
 * layout.tsx, and delete the themes block in globals.css.
 */

const THEMES = [
  { id: "nishan", label: "Nishan", note: "Navy & gold — current", swatch: ["#0a1b33", "#c9a227", "#f5efe0"] },
  { id: "kesri", label: "Kesri", note: "Saffron & oxblood", swatch: ["#2f110c", "#e08421", "#f9ead9"] },
  { id: "puratan", label: "Puratan", note: "Aged manuscript sepia", swatch: ["#2b2110", "#ad8a3a", "#f2e9d5"] },
  { id: "neel", label: "Neel", note: "Nihang indigo & brass", swatch: ["#141433", "#b99a45", "#efece1"] },
  { id: "shaheedi", label: "Shaheedi", note: "Burgundy & antique gold", swatch: ["#290b16", "#bf954c", "#f4e8e3"] },
  { id: "sarbloh", label: "Sarbloh", note: "Steel & muted brass", swatch: ["#171b1f", "#a08c62", "#ecedec"] },
  { id: "basanti", label: "Basanti", note: "Mustard & deep pine", swatch: ["#14231b", "#cba62c", "#f3eed9"] },
] as const;

const STORAGE_KEY = "theme-experiment";

/*
 * The chosen theme is read as an external store, the same approach used in
 * LanguageProvider: it keeps the first client render matching the server's and
 * avoids restoring the saved value with setState inside an effect.
 */
const listeners = new Set<() => void>();

function readTheme(): string {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && THEMES.some((t) => t.id === saved)) return saved;
  } catch {
    /* localStorage blocked — fall back to the default palette */
  }
  return "nishan";
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

/** Apply to <html>; "nishan" is what :root declares, so it needs no attribute. */
function apply(id: string) {
  if (id === "nishan") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", id);
}

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const active = useSyncExternalStore(subscribe, readTheme, () => "nishan");

  // Keep <html> in step with the store, including the initial restore.
  if (typeof document !== "undefined") apply(active);

  const pick = useCallback((id: string) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* not persisted, but the switch still applies for this session */
    }
    apply(id);
    listeners.forEach((l) => l());
  }, []);

  return (
    <div className="fixed bottom-6 left-5 z-50 sm:left-6">
      {open && (
        <div className="mb-3 w-60 overflow-hidden rounded-xl border border-gold-400/30 bg-navy-950/95 shadow-2xl backdrop-blur">
          <p className="border-b border-gold-400/20 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-gold-300">
            Try a palette
          </p>
          <div className="py-1">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => pick(theme.id)}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-navy-800 ${
                  active === theme.id ? "bg-navy-800" : ""
                }`}
              >
                <span className="flex flex-shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
                  {theme.swatch.map((c) => (
                    <span
                      key={c}
                      style={{ background: c }}
                      className="h-4 w-2.5"
                    />
                  ))}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold text-cream-100">
                    {theme.label}
                    {active === theme.id && (
                      <span className="ml-1.5 text-gold-400">&bull;</span>
                    )}
                  </span>
                  <span className="block truncate text-[11px] text-cream-100/55">
                    {theme.note}
                  </span>
                </span>
              </button>
            ))}
          </div>
          <p className="border-t border-gold-400/20 px-4 py-2 text-[10px] leading-snug text-cream-100/40">
            Experimental — saved to this browser only, not published.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close palette picker" : "Open palette picker"}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/40 bg-navy-950/90 text-gold-300 shadow-lg backdrop-blur transition hover:border-gold-400"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.7}
        >
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="8" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="8.5" cy="11" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="10" cy="15" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="15" cy="13" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      </button>
    </div>
  );
}
