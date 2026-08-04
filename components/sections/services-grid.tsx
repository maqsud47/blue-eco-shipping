import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/common/container";
import { SectionEyebrow } from "@/components/common/section-eyebrow";
import { Reveal } from "@/components/common/reveal";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { SERVICES } from "@/lib/site-data";

export function ServicesGrid() {
  const t = useTranslations();

  return (
    <section id="services" className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionEyebrow>{t("home.services.eyebrow")}</SectionEyebrow>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-h2 max-w-xl">{t("home.services.title")}</h2>
            <p className="text-steel max-w-md">{t("home.services.subtitle")}</p>
          </div>
        </Reveal>

        <Reveal stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group h-full">
                <Card className="be-lift h-full">
                  <CardHeader>
                    <span className="bg-tide/10 text-tide mb-2 inline-flex size-11 items-center justify-center rounded-lg transition-colors duration-300 group-hover:bg-tide group-hover:text-white">
                      <Icon className="size-5" />
                    </span>
                    <CardTitle className="text-deep">
                      {t(`services.${s.key}.name`)}
                    </CardTitle>
                    <CardDescription>
                      {t(`services.${s.key}.short`)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-tide inline-flex items-center gap-1 text-sm font-medium">
                      {t("cta.learnMore")}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
