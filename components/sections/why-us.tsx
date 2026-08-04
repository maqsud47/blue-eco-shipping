import { useTranslations } from "next-intl";
import { Container } from "@/components/common/container";
import { SectionEyebrow } from "@/components/common/section-eyebrow";
import { Reveal } from "@/components/common/reveal";
import { WHY } from "@/lib/site-data";

export function WhyUs() {
  const t = useTranslations();

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionEyebrow>{t("home.why.eyebrow")}</SectionEyebrow>
          <h2 className="text-h2 mt-3 max-w-2xl">{t("home.why.title")}</h2>
        </Reveal>

        <Reveal
          stagger
          className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {WHY.map((w) => {
            const Icon = w.icon;
            return (
              <div key={w.key} className="flex gap-4">
                <span className="bg-tide/10 text-tide mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-lg">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-heading text-deep text-base font-semibold">
                    {t(`home.why.items.${w.key}.title`)}
                  </h3>
                  <p className="text-steel mt-1 text-sm">
                    {t(`home.why.items.${w.key}.desc`)}
                  </p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
