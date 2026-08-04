import type { MetadataRoute } from "next";

const SITE_URL = "https://www.bababhairoopchandjimuseum.com";

/**
 * Lists every page for search engines. Without this Google has to discover
 * pages by following links, which is slower and can miss some.
 *
 * changeFrequency and priority are hints, not instructions — the relic archive
 * and the tour dates are the two pages that actually change, so they are
 * flagged as the more frequently updated.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date();

  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/relics", priority: 0.9, changeFrequency: "weekly" },
    { path: "/lineage", priority: 0.8, changeFrequency: "monthly" },
    { path: "/schedule", priority: 0.8, changeFrequency: "weekly" },
    { path: "/custodian", priority: 0.7, changeFrequency: "monthly" },
    { path: "/host", priority: 0.6, changeFrequency: "yearly" },
    { path: "/seva", priority: 0.6, changeFrequency: "yearly" },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: updated,
    changeFrequency,
    priority,
  }));
}
