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

export function ContactForm() {
  const t = useTranslations("forms");

  const schema = z.object({
    name: z.string().min(1, t("errors.nameRequired")),
    email: z
      .string()
      .min(1, t("errors.emailRequired"))
      .email(t("errors.emailInvalid")),
    phone: z.string().min(1, t("errors.phoneRequired")),
    company: z.string().optional(),
    message: z.string().min(1, t("errors.messageRequired")),
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
    if (v.botcheck) return; // Honeypot tripped
    const res = await submitToWeb3Forms({
      subject: `New contact — ${v.name}`,
      from_name: `${v.name} (Blu Eco Shipping & Logistics website)`,
      email: v.email,
      phone: v.phone,
      company: v.company,
      message: v.message,
    });
    if (res.ok) {
      setDone(true);
      reset();
    } else setError(res.error);
  }

  if (done) return <FormSuccess onReset={() => setDone(false)} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
      {/* Honeypot: hidden from real users, tempting for bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
        {...register("botcheck")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="c-name" label={t("name")} error={errors.name?.message}>
          <Input
            id="c-name"
            placeholder={t("namePlaceholder")}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </Field>
        <Field id="c-company" label={t("company")}>
          <Input
            id="c-company"
            placeholder={t("companyPlaceholder")}
            {...register("company")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="c-email" label={t("email")} error={errors.email?.message}>
          <Input
            id="c-email"
            type="email"
            placeholder={t("emailPlaceholder")}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
        <Field id="c-phone" label={t("phone")} error={errors.phone?.message}>
          <Input
            id="c-phone"
            type="tel"
            placeholder={t("phonePlaceholder")}
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </Field>
      </div>

      <Field id="c-message" label={t("message")} error={errors.message?.message}>
        <Textarea
          id="c-message"
          rows={5}
          placeholder={t("messagePlaceholder")}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </Field>

      <div>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? t("submitting") : t("submitContact")}
        </Button>
      </div>

      <FormError reason={error} />
    </form>
  );
}
