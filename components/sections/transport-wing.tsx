import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/common/container";
import { SectionEyebrow } from "@/components/common/section-eyebrow";
import { Reveal } from "@/components/common/reveal";

export function TransportWing() {
  const t = useTranslations("home.wing");

  return (
    <section className="py-16 sm:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal className="ring-border group relative aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_20px_50px_-20px_rgba(6,25,58,0.35)] ring-1">
          <Image
            src="/photos/truck1.jpg"
            alt={t("name")}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Reveal>
        <Reveal delay={120}>
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h2 className="text-h2 mt-3">{t("name")}</h2>
          <p className="text-steel mt-4 text-lg">{t("line")}</p>
          <Link
            href="/road-transportation"
            className="text-tide group mt-6 inline-flex items-center gap-1.5 font-medium hover:underline"
          >
            {t("readMore")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
