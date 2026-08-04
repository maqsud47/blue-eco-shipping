"use client";

import { CheckCircle2, AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/site-data";

export function FormSuccess({ onReset }: { onReset: () => void }) {
  const t = useTranslations("forms");
  return (
    <div
      role="status"
      aria-live="polite"
      className="border-success/30 bg-success/5 rounded-xl border p-6"
    >
      <CheckCircle2 className="text-success size-8" />
      <h3 className="text-deep font-heading mt-3 text-lg font-semibold">
        {t("successTitle")}
      </h3>
      <p className="text-slate/80 mt-2 text-sm">
        {t("successBody")}{" "}
        {CONTACT.whatsapps.map((w, i) => (
          <span key={w.number}>
            {i > 0 && " or "}
            <a
              href={`https://wa.me/${w.number}`}
              className="text-tide font-medium hover:underline"
            >
              {w.display}
            </a>
          </span>
        ))}
        .
      </p>
      <Button className="mt-5" variant="outline" onClick={onReset}>
        {t("successAgain")}
      </Button>
    </div>
  );
}

export function FormError({
  reason,
}: {
  reason: "config" | "network" | undefined;
}) {
  const t = useTranslations("forms");
  if (!reason) return null;
  return (
    <div
      role="alert"
      className="border-error/30 bg-error/5 mt-4 flex items-start gap-3 rounded-lg border p-4 text-sm"
    >
      <AlertTriangle className="text-error mt-0.5 size-5 shrink-0" />
      <div>
        <div className="text-deep font-semibold">{t("errorTitle")}</div>
        <p className="text-slate/80 mt-1">
          {reason === "config" ? t("errors.config") : t("errorBody")}
        </p>
      </div>
    </div>
  );
}
