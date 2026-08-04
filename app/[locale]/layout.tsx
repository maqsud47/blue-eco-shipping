import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Manrope, Space_Grotesk, Noto_Sans_Bengali } from "next/font/google";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/seo";
import { TopBar } from "@/components/layout/top-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/common/back-to-top";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-bengali",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  const brand = await getTranslations({ locale, namespace: "brand" });
  const brandName = brand("name");
  const base = siteUrl();
  return {
    metadataBase: new URL(base),
    title: {
      default: t("title"),
      template: `%s — ${brandName}`,
    },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`])
      ),
    },
    openGraph: {
      type: "website",
      siteName: brandName,
      locale: locale === "bn" ? "bn_BD" : "en_US",
      title: t("title"),
      description: t("description"),
      url: `${base}/${locale}`,
      images: [
        {
          url: "/photos/cover.jpg",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("description"),
    },
    icons: {
      icon: [{ url: "/icon.png", type: "image/png" }],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.webmanifest",
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0e6d78",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${spaceGrotesk.variable} ${notoBengali.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        {/* Without JS the scroll observer never fires — keep content visible. */}
        <noscript>
          <style>{`.be-reveal,.be-stagger>*{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <NextIntlClientProvider>
          <a
            href="#main"
            className="bg-deep focus:ring-tide sr-only rounded-md px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:ring-2"
          >
            {t("skipToContent")}
          </a>
          <TopBar />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
