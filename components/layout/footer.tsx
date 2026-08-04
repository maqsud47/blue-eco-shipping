import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/common/container";
import { FacebookIcon, LinkedinIcon } from "@/components/common/social-icons";
import { NAV_LINKS, SERVICES, OFFICES, SOCIAL } from "@/lib/site-data";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-abyss text-white/70">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-white p-1">
              <Image
                src="/brand/logo.png"
                alt=""
                width={36}
                height={36}
                className="size-full object-contain"
              />
            </span>
            <span className="font-heading text-base font-bold text-white">
              {t("brand.name")}
            </span>
          </div>
          <p className="mt-4 text-sm">{t("footer.blurb")}</p>
          {(SOCIAL.facebook !== "#" || SOCIAL.linkedin !== "#") && (
            <div className="mt-5 flex gap-3">
              {SOCIAL.facebook !== "#" && (
                <a
                  href={SOCIAL.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex size-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-tide hover:text-white"
                >
                  <FacebookIcon />
                </a>
              )}
              {SOCIAL.linkedin !== "#" && (
                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex size-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-tide hover:text-white"
                >
                  <LinkedinIcon />
                </a>
              )}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold tracking-wide text-white uppercase">
            {t("footer.servicesTitle")}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="transition-colors hover:text-white"
                >
                  {t(`services.${s.key}.name`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold tracking-wide text-white uppercase">
            {t("footer.linksTitle")}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.key}>
                <Link
                  href={l.href}
                  className="transition-colors hover:text-white"
                >
                  {t(`nav.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold tracking-wide text-white uppercase">
            {t("footer.officesTitle")}
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {OFFICES.map((o) => (
              <li key={o.key}>
                <span className="block font-medium text-white/90">
                  {t(`offices.${o.key}`)}
                </span>
                <span className="block text-white/55">
                  {t(`offices.${o.key}Address`)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs sm:flex-row">
          <p>
            © {year} {t("brand.name")}. {t("footer.rights")}
          </p>
          <p>{t("footer.tagline")}</p>
        </Container>
      </div>
    </footer>
  );
}
