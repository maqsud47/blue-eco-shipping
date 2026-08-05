import { routing } from "@/i18n/routing";
import { SERVICES } from "@/lib/site-data";

/**
 * Public site URL for canonical + OG + sitemap. This is server-only (called
 * from generateMetadata / sitemap.ts / robots.ts), so it can safely read
 * non-public Vercel env vars.
 *
 * Priority:
 *  1. NEXT_PUBLIC_SITE_URL      — explicit override (the custom domain)
 *  2. VERCEL_PROJECT_PRODUCTION_URL — Vercel's stable production domain
 *  3. VERCEL_URL                — the per-deployment Vercel URL
 *  4. http://localhost:3000     — local dev ONLY
 *
 * The Vercel fallbacks are the safety net: if the env var is ever missing on a
 * production deploy, canonical/sitemap/OG resolve to the real domain instead of
 * localhost (which would silently de-index the whole site).
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  if (explicit) return explicit;

  // These are bare hostnames (no protocol) supplied by Vercel.
  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercelHost) return `https://${vercelHost.replace(/\/+$/, "")}`;

  return "http://localhost:3000";
}

/** All localized paths for a given route ("/", "/services", …). */
export function localePaths(path: string): { locale: string; url: string }[] {
  const base = siteUrl();
  const p = path === "/" ? "" : path;
  return routing.locales.map((locale) => ({
    locale,
    url: `${base}/${locale}${p}`,
  }));
}

/** Every public route we know about, for the sitemap. */
export const ROUTES: string[] = [
  "/",
  "/services",
  ...SERVICES.map((s) => `/services/${s.slug}`),
  "/about",
  "/road-transportation",
  "/contact",
  "/quote",
];
