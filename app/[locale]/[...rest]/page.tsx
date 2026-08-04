import { notFound } from "next/navigation";

/**
 * Any unmatched path inside a locale renders the localized 404 in
 * app/[locale]/not-found.tsx instead of Next's bare default page.
 */
export default function CatchAllNotFound() {
  notFound();
}
