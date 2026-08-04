import Image from "next/image";
import { Check, Truck, GraduationCap, Quote } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/common/page-hero";
import { HeadingRule } from "@/components/common/heading-rule";
import { SectionEyebrow } from "@/components/common/section-eyebrow";
import { Reveal } from "@/components/common/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("subtitle"), alternates: { canonical: `/${locale}/about` } };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const story = t.raw("about.story") as string[];
  const mission = t.raw("about.mission") as string[];
  const credentials = t.raw("about.leader.credentials") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        subtitle={t("about.subtitle")}
      />

      {/* Story */}
      <section className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <Reveal>
            <SectionEyebrow>{t("about.storyTitle")}</SectionEyebrow>
            <div className="mt-5 space-y-4">
              {story.map((p, i) => (
                <p key={i} className="text-slate/90 text-lg leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal
            delay={120}
            className="border-border bg-mist flex flex-col justify-center gap-6 rounded-2xl border p-8"
          >
            <div>
              <div className="font-heading text-deep text-5xl font-bold">
                {t("about.foundedYear")}
              </div>
              <div className="text-steel mt-1 text-sm">
                {t("about.foundedLabel")}
              </div>
            </div>
            <div className="border-border border-t pt-6">
              <div className="text-deep font-heading text-base font-semibold">
                {t("about.philosophyTitle")}
              </div>
              <p className="text-steel mt-2 text-sm">{t("about.philosophy")}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="border-border bg-mist border-y py-16 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal className="bg-deep rounded-2xl p-8 text-white sm:p-10">
            <div className="flex flex-col gap-3">
              <HeadingRule className="[&>span]:bg-aqua [&>svg]:text-aqua" />
              <span className="text-eyebrow text-aqua font-semibold uppercase">
                {t("about.visionTitle")}
              </span>
            </div>
            <p className="mt-5 text-lg leading-relaxed text-white/85">
              {t("about.vision")}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <SectionEyebrow>{t("about.missionTitle")}</SectionEyebrow>
            <ul className="mt-5 flex flex-col gap-4">
              {mission.map((m) => (
                <li key={m} className="flex items-start gap-3">
                  <Check className="text-tide mt-1 size-5 shrink-0" />
                  <span className="text-slate/90">{m}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Transportation wing */}
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="ring-border group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_20px_50px_-20px_rgba(6,48,44,0.35)] ring-1">
            <Image
              src="/photos/truck1.jpg"
              alt={t("about.wingName")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Reveal>
          <Reveal delay={120}>
            <span className="bg-tide/10 text-tide inline-flex size-12 items-center justify-center rounded-xl">
              <Truck className="size-6" />
            </span>
            <SectionEyebrow className="mt-5">{t("about.wingTitle")}</SectionEyebrow>
            <h2 className="text-h2 text-deep mt-3">{t("about.wingName")}</h2>
            <p className="text-steel mt-4 text-lg">{t("about.wing")}</p>
          </Reveal>
        </Container>
      </section>

      {/* Leadership */}
      <section className="border-border bg-mist border-t py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionEyebrow>{t("about.leadershipTitle")}</SectionEyebrow>
            <h2 className="text-h2 mt-3 max-w-xl">
              {t("about.leadershipSubtitle")}
            </h2>
          </Reveal>

          <Reveal
            delay={120}
            className="ring-border shadow-card mt-10 grid gap-8 overflow-hidden rounded-2xl bg-white ring-1 sm:grid-cols-[auto_1fr] sm:gap-10 sm:p-10"
          >
            <div className="bg-mist relative aspect-square w-full overflow-hidden sm:size-52 sm:rounded-2xl">
              <Image
                src="/photos/founder.jpg"
                alt={t("about.leader.name")}
                fill
                sizes="(max-width: 640px) 100vw, 208px"
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-0">
              <div className="text-deep font-heading text-xl font-semibold">
                {t("about.leader.name")}
              </div>
              <div className="text-tide mt-1 font-semibold">
                {t("about.leader.role")}
              </div>
              <ul className="mt-3 space-y-1.5">
                {credentials.map((c) => (
                  <li
                    key={c}
                    className="text-steel flex items-start gap-2 text-sm"
                  >
                    <GraduationCap className="text-tide mt-0.5 size-4 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate/90 mt-4 leading-relaxed">
                {t("about.leader.bio")}
              </p>
            </div>
          </Reveal>

          {/* Founder's message */}
          <Reveal
            delay={80}
            className="ring-border shadow-card mt-6 rounded-2xl bg-white p-8 ring-1 sm:p-10"
          >
            <div className="flex flex-col gap-3">
              <HeadingRule />
              <span className="text-eyebrow text-tide font-semibold uppercase">
                {t("about.founderMessageTitle")}
              </span>
            </div>
            <blockquote className="mt-4">
              <Quote className="text-eco size-8" aria-hidden />
              <p className="text-slate/90 mt-3 text-lg leading-relaxed">
                {t("about.leader.message")}
              </p>
              <footer className="text-steel mt-5 text-sm">
                — {t("about.leader.name")}, {t("about.leader.role")}
              </footer>
            </blockquote>
          </Reveal>

          <Reveal className="border-border mt-8 rounded-xl border border-dashed bg-white p-5">
            <p className="text-steel text-sm">
              <span className="text-deep font-semibold">
                {t("about.structureTitle")}:
              </span>{" "}
              {t("about.structure")}
            </p>
          </Reveal>
        </Container>
      </section>

      <ClosingCta />
    </>
  );
}
