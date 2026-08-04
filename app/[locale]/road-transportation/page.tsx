import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/common/page-hero";
import { SectionEyebrow } from "@/components/common/section-eyebrow";
import { Reveal } from "@/components/common/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { FLEET } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "roadTransportPage" });
  return { title: t("title"), description: t("subtitle"), alternates: { canonical: `/${locale}/road-transportation` } };
}

export default async function RoadTransportationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const intro = t.raw("roadTransportPage.intro") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("roadTransportPage.eyebrow")}
        title={t("roadTransportPage.title")}
        subtitle={t("roadTransportPage.subtitle")}
      />

      {/* Intro */}
      <section className="py-16 sm:py-24">
        <Container className="max-w-3xl">
          <Reveal stagger className="space-y-5">
            {intro.map((p, i) => (
              <p
                key={i}
                className={cn(
                  "leading-relaxed",
                  i === 0 ? "text-slate/90 text-lg" : "text-steel"
                )}
              >
                {p}
              </p>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Fleet breakdown */}
      <section className="border-border bg-mist border-t py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionEyebrow>{t("roadTransportPage.fleetTitle")}</SectionEyebrow>
            <h2 className="text-h2 mt-3 max-w-xl">
              {t("roadTransportPage.fleetSubtitle")}
            </h2>
          </Reveal>

          <div className="mt-10 flex flex-col gap-6">
            {FLEET.map((v, i) => {
              const Icon = v.icon;
              const flip = i % 2 === 1;
              return (
                <Reveal
                  key={v.key}
                  className="ring-border shadow-card be-lift group grid overflow-hidden rounded-2xl bg-white ring-1 lg:grid-cols-2"
                >
                  <div
                    className={cn(
                      "relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[280px]",
                      flip && "lg:order-2"
                    )}
                  >
                    <Image
                      src={v.image}
                      alt={t(`roadTransportPage.fleet.${v.key}.name`)}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div
                    className={cn(
                      "flex flex-col justify-center p-7 sm:p-9",
                      flip && "lg:order-1"
                    )}
                  >
                    <span className="bg-tide/10 text-tide inline-flex size-11 items-center justify-center rounded-lg">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-heading text-deep mt-4 text-xl font-bold">
                      {t(`roadTransportPage.fleet.${v.key}.name`)}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="bg-deep/5 text-deep inline-flex rounded-full px-3 py-1 text-xs font-semibold">
                        {t("roadTransportPage.capacityLabel")}:{" "}
                        {t(`roadTransportPage.fleet.${v.key}.capacity`)}
                      </span>
                    </div>
                    <p className="text-steel mt-4 text-sm leading-relaxed">
                      {t(`roadTransportPage.fleet.${v.key}.desc`)}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <ClosingCta />
    </>
  );
}
