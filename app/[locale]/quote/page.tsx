import { Phone, Mail } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/common/page-hero";
import { QuoteForm } from "@/components/forms/quote-form";
import { CONTACT, telHref } from "@/lib/site-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quotePage" });
  return { title: t("title"), description: t("subtitle"), alternates: { canonical: `/${locale}/quote` } };
}

export default async function QuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHero
        eyebrow={t("quotePage.eyebrow")}
        title={t("quotePage.title")}
        subtitle={t("quotePage.subtitle")}
      />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-deep font-heading text-lg font-semibold">
              {t("quotePage.formTitle")}
            </h2>
            <div className="mt-6">
              <QuoteForm />
            </div>
          </div>

          <aside className="border-border bg-mist h-fit rounded-2xl border p-7">
            <h2 className="text-deep font-heading text-lg font-semibold">
              {t("quotePage.asideTitle")}
            </h2>
            <p className="text-steel mt-3 text-sm">{t("quotePage.asideDesc")}</p>

            <div className="border-border mt-6 space-y-3 border-t pt-5 text-sm">
              {CONTACT.phones.map((p) => (
                <a
                  key={p.tel}
                  href={telHref(p.tel)}
                  className="text-slate/85 hover:text-tide flex items-center gap-2 transition-colors"
                >
                  <Phone className="text-steel size-4" />
                  {p.display}
                </a>
              ))}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-slate/85 hover:text-tide flex items-center gap-2 transition-colors"
              >
                <Mail className="text-steel size-4" />
                {CONTACT.email}
              </a>
              {CONTACT.whatsapps.map((w) => (
                <a
                  key={w.number}
                  href={`https://wa.me/${w.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate/85 hover:text-tide flex items-center gap-2 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366] size-4">
                    <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.7 6L0 24l6.2-1.6a12 12 0 0 0 5.8 1.5c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.4Z"/>
                  </svg>
                  WhatsApp {w.display}
                </a>
              ))}
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
