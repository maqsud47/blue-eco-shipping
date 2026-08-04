import Image from "next/image";
import { ArrowRight, Check, Boxes } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/common/page-hero";
import { SectionEyebrow } from "@/components/common/section-eyebrow";
import { Reveal } from "@/components/common/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { buttonVariants } from "@/components/ui/button";
import { SERVICES } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  // Without its own description this page would inherit the home one verbatim.
  return { title: t("title"), description: t("subtitle"), alternates: { canonical: `/${locale}/services` } };
}

function ServiceRow({ slug, index }: { slug: string; index: number }) {
  const t = useTranslations();
  const service = SERVICES.find((s) => s.slug === slug)!;
  const Icon = service.icon;
  const photo = service.image;
  const flip = index % 2 === 1;

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      <Reveal className={cn(flip && "lg:order-2")}>
        <span className="bg-tide/10 text-tide inline-flex size-12 items-center justify-center rounded-xl">
          <Icon className="size-6" />
        </span>
        <h2 className="text-h2 text-deep mt-5">{t(`services.${service.key}.name`)}</h2>
        <p className="text-tide mt-2 font-medium">
          {t(`serviceDetail.${service.key}.tagline`)}
        </p>
        <p className="text-steel mt-4">{t(`serviceDetail.${service.key}.long`)}</p>
        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {(t.raw(`serviceDetail.${service.key}.points`) as string[]).map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm">
              <Check className="text-tide mt-0.5 size-4 shrink-0" />
              <span className="text-slate/85">{p}</span>
            </li>
          ))}
        </ul>
        <Link
          href={`/services/${service.slug}`}
          className={cn(buttonVariants({ variant: "outline" }), "mt-7")}
        >
          {t("common.readMore")} <ArrowRight />
        </Link>
      </Reveal>

      <Reveal delay={120} className={cn(flip && "lg:order-1")}>
        <div className="ring-border group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_20px_50px_-20px_rgba(6,25,58,0.35)] ring-1">
          <Image
            src={photo}
            alt={t(`services.${service.key}.name`)}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </Reveal>
    </div>
  );
}

export default async function ServicesPage({
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
        eyebrow={t("servicesPage.eyebrow")}
        title={t("servicesPage.title")}
        subtitle={t("servicesPage.subtitle")}
      />

      <section className="py-16 sm:py-24">
        <Container className="flex flex-col gap-16 sm:gap-24">
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.slug} slug={s.slug} index={i} />
          ))}
        </Container>
      </section>

      <section className="border-border bg-mist border-y py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionEyebrow>{t("common.whatWeHandle")}</SectionEyebrow>
            <h2 className="text-h2 mt-3">{t("servicesPage.additionalTitle")}</h2>
          </Reveal>
          <Reveal stagger className="mt-8 grid gap-4 sm:grid-cols-2">
            {(t.raw("servicesPage.additional") as string[]).map((item) => (
              <div
                key={item}
                className="ring-border shadow-card be-lift flex items-center gap-3 rounded-xl bg-white px-5 py-4 ring-1"
              >
                <Boxes className="text-tide size-5 shrink-0" />
                <span className="text-slate/85 text-sm font-medium">{item}</span>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <ClosingCta />
    </>
  );
}
