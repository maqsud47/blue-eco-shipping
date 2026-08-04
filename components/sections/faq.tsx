import { useTranslations } from "next-intl";
import { Container } from "@/components/common/container";
import { HeadingRule } from "@/components/common/heading-rule";
import { Reveal } from "@/components/common/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type QA = { q: string; a: string };

export function Faq() {
  const t = useTranslations("home.faq");
  const items = t.raw("items") as QA[];

  return (
    <section className="border-border bg-mist border-t py-16 sm:py-24">
      <Container className="max-w-3xl">
        <Reveal className="text-center">
          <div className="flex justify-center">
            <HeadingRule />
          </div>
          <p className="text-eyebrow text-tide mt-3 font-semibold uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="text-h2 mt-3">{t("title")}</h2>
        </Reveal>

        <Reveal
          delay={100}
          className="border-border mt-8 rounded-xl border bg-white px-5"
        >
        <Accordion multiple={false}>
          {items.map((it, i) => (
            <AccordionItem key={i} value={String(i)}>
              <AccordionTrigger className="text-deep text-base">
                {it.q}
              </AccordionTrigger>
              <AccordionContent className="text-steel">{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        </Reveal>
      </Container>
    </section>
  );
}
