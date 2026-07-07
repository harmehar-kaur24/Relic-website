"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

/** Compact hamburger, embedded in the header, that pops open the site's deep-dive pages. */
export default function DeepLinkMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const DEEP_LINKS = [
    { href: "/relics", label: t("menuRelicArchive") },
    { href: "/lineage", label: t("menuLineageHistory") },
    { href: "/schedule", label: t("menuTourSchedule") },
    { href: "/host", label: t("menuHostVisit") },
    { href: "/seva", label: t("menuVolunteerSeva") },
    { href: "/custodian", label: t("menuCustodian") },
  ];

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close menu" : "Open site menu"}
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/40 bg-navy-900/60 text-gold-300 transition hover:border-gold-400 sm:h-10 sm:w-10"
      >
        <span className="relative flex h-3 w-4 flex-col justify-between sm:h-3.5 sm:w-5">
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 5 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="h-[2px] w-full rounded-full bg-current"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.15 }}
            className="h-[2px] w-full rounded-full bg-current"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -5 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="h-[2px] w-full rounded-full bg-current"
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-xl border border-gold-400/20 bg-navy-950/95 py-2 shadow-xl backdrop-blur"
          >
            {DEEP_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-cream-100 transition hover:bg-navy-800 hover:text-gold-300"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
