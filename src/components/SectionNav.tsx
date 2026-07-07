"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

type SectionId =
  | "hero"
  | "relics"
  | "lineage"
  | "schedule"
  | "host-seva"
  | "contact";

const SECTION_IDS: SectionId[] = [
  "hero",
  "relics",
  "lineage",
  "schedule",
  "host-seva",
  "contact",
];

function useActiveSection() {
  const [active, setActive] = useState<SectionId>("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

/** Vertical rail of same-page scroll links — never navigates away. */
export default function SectionNav() {
  const active = useActiveSection();
  const { t } = useLanguage();

  const SECTIONS: { id: SectionId; label: string }[] = [
    { id: "hero", label: t("navHome") },
    { id: "relics", label: t("navRelics") },
    { id: "lineage", label: t("navLineage") },
    { id: "schedule", label: t("navSchedule") },
    { id: "host-seva", label: t("navHostSeva") },
    { id: "contact", label: t("navContact") },
  ];

  return (
    <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:flex">
      <div className="flex flex-col items-end gap-3.5 rounded-full bg-navy-950/90 px-3 py-4 shadow-lg backdrop-blur">
        {SECTIONS.map((section) => {
          const isActive = active === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-label={`Jump to ${section.label}`}
              className="group relative flex items-center justify-end py-0.5"
            >
              <span
                className={`pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded-md px-2 py-1 text-xs shadow-md transition-all duration-300 ${
                  isActive
                    ? "bg-navy-950 font-semibold text-gold-300 opacity-100"
                    : "bg-navy-950 font-medium text-cream-100 opacity-0 group-hover:opacity-100"
                }`}
              >
                {section.label}
              </span>
              <span
                className={`h-[3px] rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-8 bg-gold-500"
                    : "w-4 bg-cream-100/40 group-hover:w-5 group-hover:bg-gold-300"
                }`}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
