"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("header.openMenu")}
            className="text-white hover:bg-white/10 lg:hidden"
          />
        }
      >
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-80 border-l-0 bg-deep text-white"
      >
        <SheetTitle className="px-4 pt-4 text-white">
          {t("brand.name")}
        </SheetTitle>
        <nav className="mt-4 flex flex-col px-2">
          {NAV_LINKS.map((l) => (
            <SheetClose
              key={l.key}
              render={<Link href={l.href} />}
              className="rounded-lg px-4 py-3 text-base font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
            >
              {t(`nav.${l.key}`)}
            </SheetClose>
          ))}
        </nav>
        <div className="mt-4 flex flex-col gap-4 px-4">
          <SheetClose
            render={<Link href="/quote" />}
            className={cn(
              buttonVariants(),
              "w-full bg-tide text-white hover:bg-aqua"
            )}
          >
            {t("cta.getQuote")}
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
