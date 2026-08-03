"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { custodian } from "@/lib/data";

const socialLinks = [
  { label: "Instagram", href: custodian.instagram },
  { label: "YouTube", href: custodian.youtube },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-navy-800 bg-navy-950 text-cream-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="font-serif text-lg text-gold-300">
            Baba Bhai Roop Chand Ji Collection Museum
          </span>
          <p className="max-w-xl text-sm text-cream-100/70">
            {t("footerTagline")}
          </p>
          <div className="flex gap-5 text-sm font-medium">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-100/80 transition hover:text-gold-300"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-cream-100/50">
            <Link href="/relics" className="hover:text-gold-300">
              {t("menuRelicArchive")}
            </Link>
            <Link href="/lineage" className="hover:text-gold-300">
              {t("navLineage")}
            </Link>
            <Link href="/schedule" className="hover:text-gold-300">
              {t("navSchedule")}
            </Link>
            <Link href="/host" className="hover:text-gold-300">
              {t("menuHostVisit")}
            </Link>
            <Link href="/seva" className="hover:text-gold-300">
              {t("menuVolunteerSeva")}
            </Link>
            <Link href="/custodian" className="hover:text-gold-300">
              {t("menuCustodian")}
            </Link>
          </div>
          <p className="text-xs text-cream-100/40">
            &copy; 2026 Baba Bhai Roop Chand Ji Collection Museum &middot;{" "}
            {t("footerInService")}
          </p>
        </div>
      </div>
    </footer>
  );
}
