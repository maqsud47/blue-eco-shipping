import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/common/page-hero";
import { SectionEyebrow } from "@/components/common/section-eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { SERVICES, GATEWAYS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICES.map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  const t = await getTranslations({ locale });
  return {
    title: t(`services.${service.key}.name`),
    // Short, search-result-friendly copy; `.long` is body text and gets truncated.
    description: t(`serviceDetail.${service.key}.meta`),
    alternates: { canonical: `/${locale}/services/${slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const t = await getTranslations();
  const points = t.raw(`serviceDetail.${service.key}.points`) as string[];

  return (
    <>
      <PageHero
        eyebrow={t("servicesPage.eyebrow")}
        title={t(`services.${service.key}.name`)}
        subtitle={t(`serviceDetail.${service.key}.tagline`)}
      />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <Link
              href="/services"
              className="text-tide inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
            >
              <ArrowLeft className="size-4" /> {t("common.servicesAll")}
            </Link>
            <div className="ring-border relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl shadow-[0_20px_50px_-20px_rgba(6,25,58,0.35)] ring-1">
              <Image
                src={service.image}
                alt={t(`services.${service.key}.name`)}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                priority
              />
            </div>
            <p className="text-slate/90 mt-6 text-lg leading-relaxed">
              {t(`serviceDetail.${service.key}.long`)}
            </p>

            <h2 className="text-h3 text-deep font-heading mt-10 font-semibold">
              {t("common.whatWeHandle")}
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {points.map((p) => (
                <li
                  key={p}
                  className="ring-border shadow-card flex items-start gap-3 rounded-xl bg-white px-4 py-3.5 ring-1"
                >
                  <Check className="text-tide mt-0.5 size-5 shrink-0" />
                  <span className="text-slate/85 text-sm">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/quote"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-tide text-white hover:bg-aqua"
                )}
              >
                {t("cta.getQuote")} <ArrowRight />
              </Link>
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
              >
                {t("cta.contactUs")}
              </Link>
            </div>
          </div>

          {/* Gateways aside */}
          <aside className="border-border bg-mist h-fit rounded-2xl border p-7">
            <SectionEyebrow>{t("home.gateways.eyebrow")}</SectionEyebrow>
            <ul className="mt-5 flex flex-col gap-4">
              {GATEWAYS.map((g) => {
                const Icon = g.icon;
                return (
                  <li key={g.key} className="flex items-start gap-3">
                    <span className="bg-deep inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-white">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <div className="text-deep font-heading text-sm font-semibold">
                        {t(`gateways.${g.key}.name`)}
                      </div>
                      <div className="text-steel text-xs">
                        {t(`gateways.${g.key}.desc`)}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </aside>
        </Container>
      </section>
    </>
  );
}
