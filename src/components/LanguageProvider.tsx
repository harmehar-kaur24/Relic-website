"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";
import { translations, type Language, type TranslationKey } from "@/lib/i18n";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "language";

/*
 * The chosen language is treated as an external store backed by localStorage.
 *
 * Without persistence the language reset to English on every navigation, so
 * picking Punjabi only lasted until the next click — which made the whole
 * translation close to useless for anyone actually browsing in Punjabi.
 *
 * useSyncExternalStore is used rather than useState + useEffect because it
 * takes a separate server snapshot: the first client render matches the
 * server's ("en"), then React immediately re-renders with the stored value.
 * That avoids both a hydration mismatch and a setState-inside-an-effect.
 */
const listeners = new Set<() => void>();

function read(): Language {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "pa" || saved === "en") return saved;
  } catch {
    /* localStorage blocked (private mode) — fall back to English */
  }
  return "en";
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Keep tabs in step when the choice changes in another one.
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function write(next: Language) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* preference won't persist, but the toggle still works this session */
  }
  listeners.forEach((l) => l());
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, read, () => "en" as Language);

  const setLanguage = useCallback((next: Language) => write(next), []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key) => translations[language][key] ?? translations.en[key],
    }),
    [language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
