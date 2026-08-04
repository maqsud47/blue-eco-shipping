import { Phone, Mail, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/common/container";
import { FacebookIcon, LinkedinIcon } from "@/components/common/social-icons";
import { CONTACT, SOCIAL, telHref } from "@/lib/site-data";

/** Thin utility bar above the header. Hidden on small screens. */
export function TopBar() {
  const t = useTranslations("topbar");

  return (
    <div className="hidden bg-abyss text-white/70 sm:block">
      <Container className="flex h-9 items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-5">
          {CONTACT.phones.slice(0, 2).map((p) => (
            <a
              key={p.tel}
              href={telHref(p.tel)}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Phone className="size-3.5" /> {p.display}
            </a>
          ))}
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <Mail className="size-3.5" /> {CONTACT.email}
          </a>
          <span className="hidden items-center gap-1.5 md:inline-flex">
            <Clock className="size-3.5" /> {t("hours")}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {SOCIAL.facebook !== "#" && (
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition-colors hover:text-white"
            >
              <FacebookIcon className="size-3.5" />
            </a>
          )}
          {SOCIAL.linkedin !== "#" && (
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-white"
            >
              <LinkedinIcon className="size-3.5" />
            </a>
          )}
        </div>
      </Container>
    </div>
  );
}
