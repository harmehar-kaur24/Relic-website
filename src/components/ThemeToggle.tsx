"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Mode = "kesri" | "puratan";

const STORAGE_KEY = "theme";
const DEFAULT: Mode = "kesri";

/*
 * Same external-store pattern as LanguageProvider: the mode lives in
 * localStorage, and useSyncExternalStore is used rather than useState +
 * useEffect so the first client render matches the server's and there is no
 * hydration mismatch or setState-inside-an-effect.
 *
 * The attribute is written to <html> directly rather than held in React state,
 * so an inline script in layout.tsx can apply the stored mode before first
 * paint without waiting for React to hydrate.
 */
const listeners = new Set<() => void>();

function read(): Mode {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "puratan" ? "puratan" : DEFAULT;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function apply(next: Mode) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* preference won't persist, but the toggle still works this session */
  }
  listeners.forEach((l) => l());
}

export default function ThemeToggle() {
  const mode = useSyncExternalStore(subscribe, read, () => DEFAULT);
  const isLight = mode === "puratan";

  const toggle = useCallback(() => {
    apply(isLight ? "kesri" : "puratan");
  }, [isLight]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Dark mode" : "Light mode"}
      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-gold-400/40 text-gold-300 transition hover:border-gold-400 sm:h-10 sm:w-10"
    >
      {isLight ? (
        /* moon — tapping returns to dark */
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z" />
        </svg>
      ) : (
        /* sun — tapping goes to light */
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
        </svg>
      )}
    </button>
  );
}
