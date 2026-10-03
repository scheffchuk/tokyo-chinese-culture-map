import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import en from "../../messages/en.json";
import ja from "../../messages/ja.json";
import zhHant from "../../messages/zh-Hant.json";
import type { PublicPlace } from "./catalog";
import { normalizeSearchText, publishedLocation } from "./catalog";
import { fixtureCandidates } from "./fixture";
import { candidates } from "./places";

const messagesByLocale = { ja, en, "zh-Hant": zhHant } satisfies Record<
  Locale,
  unknown
>;

/**
 * Published, in-scope locations for one locale.
 * Import this from the server only: the module reads drafts, and those must not ship to the browser.
 */
export function getPublicCatalog(locale: Locale): PublicPlace[] {
  const source =
    process.env.CATALOG === "fixture" ? fixtureCandidates : candidates;
  return source.flatMap((candidate) => {
    const location = publishedLocation(candidate);
    if (!location) return [];
    const { description, hours, photo, ...rest } = location;
    const searchable = [
      candidate.sourceName,
      location.name,
      ...location.alternateNames,
      location.address,
      ...routing.locales.flatMap((each) => {
        const messages = messagesByLocale[each];
        return [
          description[each],
          messages.wards[location.ward],
          messages.categories[location.category],
          ...location.tags.map((tag) => messages.tags[tag]),
        ];
      }),
    ];
    return [
      {
        ...rest,
        id: candidate.id,
        description: description[locale],
        hours: hours?.[locale],
        photo: photo && { ...photo, alt: photo.alt[locale] },
        searchText: normalizeSearchText(searchable.join(" \n ")),
      },
    ];
  });
}
