import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/common/container";
import { SectionEyebrow } from "@/components/common/section-eyebrow";
import { Reveal } from "@/components/common/reveal";
import { GATEWAYS } from "@/lib/site-data";

export function Gateways() {
  const t = useTranslations();

  return (
    <section
      id="gateways"
      className="border-border bg-mist border-y py-16 sm:py-24"
    >
      <Container>
        <Reveal>
          <SectionEyebrow>{t("home.gateways.eyebrow")}</SectionEyebrow>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-h2 max-w-xl">{t("home.gateways.title")}</h2>
            <p className="text-steel max-w-md">{t("home.gateways.subtitle")}</p>
          </div>
        </Reveal>

        <Reveal stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GATEWAYS.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.key}
                className="ring-border shadow-card be-lift group overflow-hidden rounded-xl bg-white ring-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={g.image}
                    alt={t(`gateways.${g.key}.name`)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="from-abyss/75 absolute inset-0 bg-gradient-to-t to-transparent" />
                  <span className="bg-deep absolute bottom-3 left-4 inline-flex size-10 items-center justify-center rounded-lg text-white">
                    <Icon className="size-5" />
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-h3 font-heading text-deep font-semibold">
                    {t(`gateways.${g.key}.name`)}
                  </h3>
                  <p className="text-steel mt-2 text-sm">
                    {t(`gateways.${g.key}.desc`)}
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
