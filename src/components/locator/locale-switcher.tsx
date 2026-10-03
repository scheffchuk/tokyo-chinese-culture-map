"use client";

import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Keeps the current search, filters and selection when changing language. */
export function LocaleSwitcher() {
  return <LocaleLinks query={Object.fromEntries(useSearchParams())} />;
}

export function LocaleLinks({ query }: { query: Record<string, string> }) {
  const t = useTranslations("locale");
  const current = useLocale();

  return (
    <nav aria-label={t("label")} className="flex gap-1 text-sm">
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href={{ pathname: "/", query }}
          locale={locale}
          hrefLang={locale}
          lang={locale}
          aria-current={locale === current ? "true" : undefined}
          className={cn(
            "focus-visible:ring-ring rounded-md px-2 py-1 outline-none focus-visible:ring-2",
            locale === current
              ? "bg-secondary text-foreground font-medium"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {t(locale)}
        </Link>
      ))}
    </nav>
  );
}
