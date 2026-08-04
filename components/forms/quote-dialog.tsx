"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { QuoteForm } from "./quote-form";
import { cn } from "@/lib/utils";

/**
 * Reusable "Get a Quote" trigger that opens a large dialog with the QuoteForm.
 * The /quote page remains the fallback (shareable link, deep-link target, no JS).
 */
export function QuoteDialog({ children }: { children: ReactNode }) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children as React.ReactElement} />
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Popup
          data-slot="dialog-content"
          className={cn(
            "bg-popover text-popover-foreground ring-foreground/10 fixed top-1/2 left-1/2 z-50 grid max-h-[calc(100dvh-2rem)] w-full max-w-[calc(100%-1.5rem)] -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_1fr] gap-0 overflow-hidden rounded-2xl p-0 shadow-2xl ring-1 outline-none",
            "sm:max-w-2xl",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 duration-150"
          )}
        >
          <div className="bg-deep text-white px-6 py-5 sm:px-8">
            <DialogPrimitive.Title className="text-deep-foreground font-heading text-lg font-semibold text-white">
              {t("quotePage.title")}
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="mt-1 text-sm text-white/70">
              {t("quotePage.subtitle")}
            </DialogPrimitive.Description>
            <DialogPrimitive.Close
              aria-label={t("header.closeMenu")}
              className="absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4l12 12M16 4L4 16" />
              </svg>
            </DialogPrimitive.Close>
          </div>
          <div className="overflow-y-auto px-6 py-6 sm:px-8">
            <QuoteForm onSubmitted={() => setTimeout(() => setOpen(false), 1800)} />
          </div>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  );
}
