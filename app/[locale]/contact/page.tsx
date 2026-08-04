import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/common/page-hero";
import { SectionEyebrow } from "@/components/common/section-eyebrow";
import { Reveal } from "@/components/common/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { buttonVariants } from "@/components/ui/button";
import { OFFICES, CONTACT, telHref } from "@/lib/site-data";
import { siteUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return { title: t("title"), description: t("subtitle"), alternates: { canonical: `/${locale}/contact` } };
}

// Google Maps embed for the Dhaka HQ. Uses the search-embed URL (no API key required).
const DHAKA_MAP_SRC =
  "https://www.google.com/maps?q=Planners+Tower,+13%2FA+Sonargaon+Road,+Dhaka&output=embed";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  // JSON-LD LocalBusiness for each office — strong tide for local SEO.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": OFFICES.map((o) => ({
      "@type": "LocalBusiness",
      "@id": `${siteUrl()}/#office-${o.key}`,
      name: `${t("brand.name")} — ${t(`offices.${o.key}`)}`,
      url: `${siteUrl()}/${locale}/contact`,
      address: {
        "@type": "PostalAddress",
        streetAddress: t(`offices.${o.key}Address`),
        addressCountry: "BD",
      },
      telephone: o.phones[0],
      email: o.emails[0],
      openingHours: "Mo-Su 00:00-23:59",
      priceRange: "Contact for quote",
      areaServed: "BD",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow={t("contactPage.eyebrow")}
        title={t("contactPage.title")}
        subtitle={t("contactPage.subtitle")}
      />

      {/* Offices */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionEyebrow>{t("contactPage.officesTitle")}</SectionEyebrow>
          </Reveal>
          <Reveal stagger className="mt-8 grid gap-6 lg:grid-cols-3">
            {OFFICES.map((o) => (
              <div
                key={o.key}
                className="ring-border shadow-card be-lift flex flex-col rounded-xl bg-white p-6 ring-1"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-tide/10 text-tide inline-flex size-10 items-center justify-center rounded-lg">
                    <MapPin className="size-5" />
                  </span>
                  <h3 className="text-deep font-heading text-base font-semibold">
                    {t(`offices.${o.key}`)}
                  </h3>
                </div>
                <p className="text-steel mt-4 text-sm leading-relaxed">
                  {t(`offices.${o.key}Address`)}
                </p>
                <div className="border-border mt-5 space-y-2 border-t pt-4 text-sm">
                  {o.phones.map((p) => (
                    <a
                      key={p}
                      href={telHref(p)}
                      className="text-slate/85 hover:text-tide flex items-center gap-2 transition-colors"
                    >
                      <Phone className="text-steel size-4 shrink-0" />
                      {p}
                    </a>
                  ))}
                  {o.emails.map((e) => (
                    <a
                      key={e}
                      href={`mailto:${e}`}
                      className="text-slate/85 hover:text-tide flex items-center gap-2 break-all transition-colors"
                    >
                      <Mail className="text-steel size-4 shrink-0" />
                      {e}
                    </a>
                  ))}
                </div>
                <div className="text-steel mt-4 flex items-center gap-2 text-xs">
                  <Clock className="size-3.5" />
                  {t("contactPage.hoursLabel")}: {t("contactPage.hoursValue")}
                </div>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Form + WhatsApp */}
      <section className="border-border bg-mist border-y py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <SectionEyebrow>{t("contactPage.sendMessageTitle")}</SectionEyebrow>
            <p className="text-steel mt-3 max-w-lg">
              {t("contactPage.sendMessageDesc")}
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="bg-deep rounded-2xl p-7 text-white">
              <h3 className="font-heading text-lg font-semibold">
                {t("contactPage.quoteTeaserTitle")}
              </h3>
              <p className="mt-2 text-sm text-white/75">
                {t("contactPage.quoteTeaserDesc")}
              </p>
              <Link
                href="/quote"
                className={cn(
                  buttonVariants(),
                  "mt-5 bg-tide text-white hover:bg-aqua"
                )}
              >
                {t("cta.getQuote")} <ArrowRight />
              </Link>
            </div>

            <div className="ring-border shadow-card rounded-2xl bg-white p-6 ring-1">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366]">
                  {/* Inline WhatsApp mark (no extra icon dep). */}
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.7 6L0 24l6.2-1.6a12 12 0 0 0 5.8 1.5c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.4ZM12 22a10 10 0 0 1-5.1-1.4l-.4-.2-3.7 1 1-3.6-.3-.4A10 10 0 1 1 22 12a10 10 0 0 1-10 10Zm5.5-7.5-2.1-.6c-.3 0-.5 0-.7.3l-.7.9c-.2.2-.4.3-.7.1-1-.4-2-1.1-2.7-2-.6-.8-1.2-1.8-1.7-2.7-.2-.3 0-.5.1-.7l.4-.5c.1-.2.2-.3.3-.5V8.5c0-.2-.7-1.6-1-2.2-.2-.6-.5-.5-.7-.5H8c-.2 0-.6.1-1 .5s-1.3 1.2-1.3 3 1.3 3.5 1.5 3.7c.2.3 2.6 4 6.3 5.6 3.1 1.2 3.7 1 4.4.9.7-.1 2.1-.9 2.4-1.7.3-.9.3-1.6.2-1.8-.1-.2-.4-.3-.7-.4Z"/>
                  </svg>
                </span>
                <div>
                  <div className="text-deep font-heading text-sm font-semibold">
                    {t("cta.whatsapp")}
                  </div>
                  <div className="text-steel text-xs">
                    {t("contactPage.hoursValue")}
                  </div>
                </div>
              </div>
              <div className="border-border mt-4 space-y-2 border-t pt-4">
                {CONTACT.whatsapps.map((w) => (
                  <a
                    key={w.number}
                    href={`https://wa.me/${w.number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate/85 hover:text-tide block text-sm transition-colors"
                  >
                    {w.display}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </Container>
      </section>

      {/* Map */}
      <section className="pt-16 pb-24 sm:pt-24">
        <Container>
          <SectionEyebrow>{t("contactPage.mapTitle")}</SectionEyebrow>
          <div className="ring-border shadow-card mt-6 overflow-hidden rounded-2xl ring-1">
            <iframe
              src={DHAKA_MAP_SRC}
              title={t("contactPage.mapTitle")}
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Container>
      </section>
    </>
  );
}
