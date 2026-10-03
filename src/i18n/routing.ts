import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ja", "en", "zh-Hant"],
  defaultLocale: "ja",
  localePrefix: "as-needed",
  // A fresh visit to `/` is always Japanese; other languages are chosen explicitly via their URL.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
