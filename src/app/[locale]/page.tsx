import { Suspense } from "react";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getPublicCatalog } from "@/catalog/publish";
import {
  LocaleLinks,
  LocaleSwitcher,
} from "@/components/locator/locale-switcher";
import { Locator } from "@/components/locator/locator";
import { routing } from "@/i18n/routing";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("header");
  const places = getPublicCatalog(locale);

  return (
    <>
      <header className="flex shrink-0 flex-wrap items-start justify-between gap-x-6 gap-y-2 border-b px-4 py-3">
        <div className="max-w-3xl">
          <h1 className="text-lg font-semibold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground text-sm">{t("tagline")}</p>
        </div>
        <Suspense fallback={<LocaleLinks query={{}} />}>
          <LocaleSwitcher />
        </Suspense>
      </header>
      <Suspense fallback={<div className="flex-1" />}>
        <Locator places={places} />
      </Suspense>
    </>
  );
}
