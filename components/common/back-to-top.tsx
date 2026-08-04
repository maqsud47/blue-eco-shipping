"use client";

import { useEffect, useState } from "react";
import { Ship } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/** Floating ship button — sails the page back to the top. */
export function BackToTop() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={t("backToTop")}
      title={t("backToTop")}
      className={cn(
        "group bg-deep hover:bg-tide focus-visible:ring-tide/50 fixed right-5 bottom-5 z-40 inline-flex size-12 items-center justify-center rounded-full text-white shadow-[0_10px_30px_-8px_rgba(6,25,58,0.6)] transition-all duration-300 outline-none focus-visible:ring-4 sm:right-7 sm:bottom-7",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <Ship className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
