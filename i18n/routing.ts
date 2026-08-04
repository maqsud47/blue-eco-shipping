import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Bangla (bn) will be added back once the translation pass is done.
  locales: ["en"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
