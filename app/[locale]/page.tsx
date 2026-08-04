import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Gateways } from "@/components/sections/gateways";
import { Stats } from "@/components/sections/stats";
import { WhyUs } from "@/components/sections/why-us";
import { TransportWing } from "@/components/sections/transport-wing";
import { Faq } from "@/components/sections/faq";
import { ClosingCta } from "@/components/sections/closing-cta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <Gateways />
      <Stats />
      <WhyUs />
      <TransportWing />
      <Faq />
      <ClosingCta />
    </>
  );
}
