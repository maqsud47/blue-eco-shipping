"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { QuoteDialog } from "@/components/forms/quote-dialog";
import { NAV_LINKS } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const t = useTranslations();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-deep text-white transition-shadow duration-300",
        scrolled
          ? "shadow-[0_6px_24px_-12px_rgba(6,25,58,0.9)]"
          : "shadow-none"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-aqua"
        >
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-sm">
            <Image
              src="/brand/logo.png"
              alt={t("brand.name")}
              width={36}
              height={36}
              className="size-full object-contain"
              priority
            />
          </span>
          <span className="font-heading truncate text-sm font-semibold tracking-tight sm:text-base sm:font-bold lg:text-lg">
            {t("brand.first")}{" "}
            <span className="text-aqua">{t("brand.rest")}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className="text-sm font-medium text-white/85 transition-colors hover:text-white"
            >
              {t(`nav.${l.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <QuoteDialog>
            <Button className="hidden bg-tide text-white hover:bg-aqua sm:inline-flex">
              {t("cta.getQuote")}
            </Button>
          </QuoteDialog>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
