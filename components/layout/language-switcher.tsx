"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LABELS: Record<string, string> = { en: "EN", bn: "বাং" };

/** Compact EN | বাং toggle. Labels are fixed (never localized). */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border border-white/20 p-0.5",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((l) => {
        const active = locale === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => router.replace(pathname, { locale: l })}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded px-2 py-0.5 text-xs font-semibold transition-colors",
              active
                ? "bg-white text-deep"
                : "text-white/75 hover:text-white"
            )}
          >
            {LABELS[l]}
          </button>
        );
      })}
    </div>
  );
}
