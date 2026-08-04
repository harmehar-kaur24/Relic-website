import type { MetadataRoute } from "next";

const SITE_URL = "https://www.bababhairoopchandjimuseum.com";

/**
 * Tells crawlers what they may visit and where the sitemap is.
 *
 * Everything is allowed — there is nothing private here. /_next/ is excluded
 * only because it holds build assets that are of no use in search results.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/_next/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
