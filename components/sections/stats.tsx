import { useTranslations } from "next-intl";
import { Container } from "@/components/common/container";
import { Reveal } from "@/components/common/reveal";
import { WaveDivider } from "@/components/common/wave-divider";
import { STAT_KEYS } from "@/lib/site-data";

// Factual figures only. TODO: add real counters (shipments handled, tonnes moved)
// when the client supplies them — do not fabricate numbers.
export function Stats() {
  const t = useTranslations("home.stats");

  return (
    <section className="bg-deep text-white">
      {/* Wave in from the mist gateways section above. */}
      <WaveDivider flip fill="text-mist" />
      <Container className="py-14 sm:py-16">
        <Reveal stagger className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STAT_KEYS.map((key) => (
            <div key={key} className="text-center lg:text-left">
              <div className="font-heading text-4xl font-bold text-white sm:text-5xl">
                {t(`items.${key}.value`)}
              </div>
              <div className="mt-1 text-sm text-white/70">
                {t(`items.${key}.label`)}
              </div>
            </div>
          ))}
        </Reveal>
      </Container>
      {/* Wave out into the white "why us" section below. */}
      <WaveDivider fill="text-white" />
    </section>
  );
}
