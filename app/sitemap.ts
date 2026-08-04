import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { ROUTES, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return ROUTES.map((path) => {
    const url = `${base}/${routing.defaultLocale}${path === "/" ? "" : path}`;
    return {
      url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: path === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((locale) => [
            locale,
            `${base}/${locale}${path === "/" ? "" : path}`,
          ])
        ),
      },
    };
  });
}
