import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/common/container";
import { HeadingRule } from "@/components/common/heading-rule";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("home.hero");
  const c = useTranslations("cta");

  return (
    <section className="relative overflow-hidden bg-abyss text-white">
      {/* Cover photo with a deep-teal overlay for text contrast. */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/photos/cover.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="from-abyss/95 via-abyss/80 to-abyss/60 absolute inset-0 bg-gradient-to-r" />
        <div className="from-abyss/70 absolute inset-0 bg-gradient-to-b via-transparent to-transparent" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-tide/20 absolute -top-1/3 right-[-10%] h-[70vh] w-[70vh] rounded-full blur-3xl" />
      </div>

      <Container className="relative pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-3xl">
          <HeadingRule className="be-rise be-rise-1 [&>span]:bg-aqua [&>svg]:text-aqua" />
          <p className="text-eyebrow be-rise be-rise-1 mt-4 font-semibold text-aqua uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="text-hero be-rise be-rise-2 mt-4 text-white">
            {t("title")}
          </h1>
          <p className="be-rise be-rise-3 mt-6 max-w-2xl text-lg text-white/75">
            {t("subtitle")}
          </p>
          <div className="be-rise be-rise-4 mt-9 flex flex-wrap gap-4">
            <Link
              href="/quote"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-tide text-white hover:bg-aqua"
              )}
            >
              {c("getQuote")} <ArrowRight />
            </Link>
            <Link
              href="/services"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-white/30 bg-transparent text-white hover:bg-white/10"
              )}
            >
              {c("ourServices")}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
