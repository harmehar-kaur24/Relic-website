"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex overflow-hidden rounded-full border border-gold-400/40 text-xs font-semibold">
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={`px-2.5 py-1 transition ${
          language === "en"
            ? "bg-gold-500 text-navy-950"
            : "text-gold-300 hover:bg-navy-800"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("pa")}
        aria-pressed={language === "pa"}
        className={`px-2.5 py-1 transition ${
          language === "pa"
            ? "bg-gold-500 text-navy-950"
            : "text-gold-300 hover:bg-navy-800"
        }`}
      >
        ਪੰਜਾਬੀ
      </button>
    </div>
  );
}
