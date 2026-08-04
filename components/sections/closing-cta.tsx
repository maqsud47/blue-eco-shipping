import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/common/container";
import { HeadingRule } from "@/components/common/heading-rule";
import { Reveal } from "@/components/common/reveal";
import { WaveDivider } from "@/components/common/wave-divider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ClosingCta() {
  const t = useTranslations("home.closing");
  const c = useTranslations("cta");

  return (
    <section className="bg-abyss text-white">
      {/* Wave in from the light section above. */}
      <WaveDivider flip fill="text-mist" />
      <Container className="py-16 text-center sm:py-20">
        <Reveal>
        <div className="flex justify-center">
          <HeadingRule className="[&>span]:bg-white/70 [&>svg]:text-white" />
        </div>
        <h2 className="text-h2 mt-4 text-white">{t("title")}</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/70">{t("subtitle")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/quote"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-tide text-white hover:bg-aqua"
            )}
          >
            {c("getQuote")}
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "border-white/30 bg-transparent text-white hover:bg-white/10"
            )}
          >
            {c("contactUs")}
          </Link>
        </div>
        </Reveal>
      </Container>
    </section>
  );
}
