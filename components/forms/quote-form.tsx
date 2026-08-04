"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Field } from "./field";
import { FormSuccess, FormError } from "./form-status";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitToWeb3Forms } from "@/lib/forms";
import { SERVICES, GATEWAYS } from "@/lib/site-data";

export function QuoteForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const t = useTranslations("forms");
  const tService = useTranslations("services");
  const tGateway = useTranslations("gateways");

  const schema = z.object({
    name: z.string().min(1, t("errors.nameRequired")),
    company: z.string().optional(),
    email: z
      .string()
      .min(1, t("errors.emailRequired"))
      .email(t("errors.emailInvalid")),
    phone: z.string().min(1, t("errors.phoneRequired")),
    service: z.string().min(1, t("errors.serviceRequired")),
    port: z.string().min(1, t("errors.portRequired")),
    cargoType: z.string().min(1, t("errors.cargoTypeRequired")),
    details: z.string().min(1, t("errors.detailsRequired")),
    botcheck: z.string().optional(),
  });
  type Values = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const [done, setDone] = useState(false);
  const [error, setError] = useState<"config" | "network" | undefined>();

  async function onSubmit(v: Values) {
    setError(undefined);
    if (v.botcheck) return;
    const res = await submitToWeb3Forms({
      subject: `New quote request — ${v.name} · ${v.service}`,
      from_name: `${v.name} (Blue Eco Shipping & Logistics website)`,
      email: v.email,
      phone: v.phone,
      company: v.company,
      service: v.service,
      port: v.port,
      cargo_type: v.cargoType,
      message: v.details,
    });
    if (res.ok) {
      setDone(true);
      reset();
      onSubmitted?.();
    } else setError(res.error);
  }

  if (done)
    return (
      <FormSuccess
        onReset={() => setDone(false)}
      />
    );

  const selectCls =
    "border-input bg-background text-slate/90 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 h-10 w-full rounded-lg border px-3 text-sm outline-none";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
        {...register("botcheck")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="q-name" label={t("name")} error={errors.name?.message}>
          <Input
            id="q-name"
            placeholder={t("namePlaceholder")}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </Field>
        <Field id="q-company" label={t("company")}>
          <Input
            id="q-company"
            placeholder={t("companyPlaceholder")}
            {...register("company")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="q-email" label={t("email")} error={errors.email?.message}>
          <Input
            id="q-email"
            type="email"
            placeholder={t("emailPlaceholder")}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
        <Field id="q-phone" label={t("phone")} error={errors.phone?.message}>
          <Input
            id="q-phone"
            type="tel"
            placeholder={t("phonePlaceholder")}
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="q-service" label={t("service")} error={errors.service?.message}>
          <select
            id="q-service"
            className={selectCls}
            defaultValue=""
            aria-invalid={!!errors.service}
            {...register("service")}
          >
            <option value="" disabled>
              {t("servicePlaceholder")}
            </option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={tService(`${s.key}.name`)}>
                {tService(`${s.key}.name`)}
              </option>
            ))}
          </select>
        </Field>
        <Field id="q-port" label={t("port")} error={errors.port?.message}>
          <select
            id="q-port"
            className={selectCls}
            defaultValue=""
            aria-invalid={!!errors.port}
            {...register("port")}
          >
            <option value="" disabled>
              {t("portPlaceholder")}
            </option>
            {GATEWAYS.map((g) => (
              <option key={g.key} value={tGateway(`${g.key}.name`)}>
                {tGateway(`${g.key}.name`)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id="q-cargo"
        label={t("cargoType")}
        error={errors.cargoType?.message}
      >
        <Input
          id="q-cargo"
          placeholder={t("cargoTypePlaceholder")}
          aria-invalid={!!errors.cargoType}
          {...register("cargoType")}
        />
      </Field>

      <Field id="q-details" label={t("details")} error={errors.details?.message}>
        <Textarea
          id="q-details"
          rows={5}
          placeholder={t("detailsPlaceholder")}
          aria-invalid={!!errors.details}
          {...register("details")}
        />
      </Field>

      <div>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="bg-tide text-white hover:bg-aqua"
        >
          {isSubmitting ? t("submitting") : t("submitQuote")}
        </Button>
      </div>

      <FormError reason={error} />
    </form>
  );
}
