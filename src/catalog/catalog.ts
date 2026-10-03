import type { Locale } from "@/i18n/routing";

export const CATEGORIES = [
  "bookstores",
  "galleries",
  "foodDrink",
  "shopsCrafts",
  "community",
] as const;
export type CategoryId = (typeof CATEGORIES)[number];

type TagId =
  | "chineseBooks"
  | "multilingual"
  | "independentPublishing"
  | "zine"
  | "library"
  | "events"
  | "talks"
  | "cafe"
  | "chineseTea"
  | "gallery"
  | "contemporaryArt"
  | "photography"
  | "studio"
  | "workshop"
  | "artClasses"
  | "fashion"
  | "crafts"
  | "indigo";

/** Tokyo's 23 special wards in official order: the directory's public boundary. */
export const WARDS = [
  "chiyoda",
  "chuo",
  "minato",
  "shinjuku",
  "bunkyo",
  "taito",
  "sumida",
  "koto",
  "shinagawa",
  "meguro",
  "ota",
  "setagaya",
  "shibuya",
  "nakano",
  "suginami",
  "toshima",
  "kita",
  "arakawa",
  "itabashi",
  "nerima",
  "adachi",
  "katsushika",
  "edogawa",
] as const;
export type WardId = (typeof WARDS)[number];

type Localized = Record<Locale, string>;

/** A verified address and map point for a venue or one of its branches. */
type Location = {
  /** Verified display name, kept in its original script. */
  name: string;
  /** Collected spellings, other scripts, and translated names; all searchable. */
  alternateNames: string[];
  category: CategoryId;
  tags: TagId[];
  /** Japanese address as published by the venue or source. */
  address: string;
  /** Free text so out-of-scope places (e.g. "kawaguchi") can be recorded and rejected. */
  ward: string;
  lat: number;
  lng: number;
  sources: { url: string; label: string; primary: boolean }[];
  /** ISO date the location was last checked against its sources. */
  verifiedOn: string;
  description: Localized;
  hours?: Localized;
  website?: string;
  photo?: { src: string; alt: Localized; credit?: string };
};

/** A collected name or handle; only becomes public once it has a verified, in-scope location. */
export type Candidate = {
  id: string;
  /** Spelling exactly as collected by the maintainer. */
  sourceName: string;
  sourceGroup: "书店" | "画廊/艺术空间" | "饮品/工艺/杂货" | "其他" | "fixture";
  status: "published" | "draft";
  verificationNotes: string;
  /** Wording or facts the maintainer should review before relying on them. */
  reviewNotes?: string;
  location?: Location;
};

export type PublicPlace = Omit<
  Location,
  "description" | "hours" | "photo" | "ward"
> & {
  id: string;
  ward: WardId;
  description: string;
  hours?: string;
  photo?: { src: string; alt: string; credit?: string };
  /** Normalized text across every language, so search ignores the display locale. */
  searchText: string;
};

// Generous box around the 23 wards; catches swapped or mistyped coordinates.
const WARD_BOUNDS = { south: 35.5, north: 35.83, west: 139.56, east: 139.92 };

function isWard(ward: string): ward is WardId {
  return (WARDS as readonly string[]).includes(ward);
}

/** NFKC folds full-width/half-width forms; case and whitespace are normalized too. */
export function normalizeSearchText(text: string) {
  return text.normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim();
}

/** The location a candidate may show publicly, or null when it must stay a draft. */
export function publishedLocation(candidate: Candidate) {
  const location = candidate.location;
  if (candidate.status !== "published" || !location) return null;
  if (!isWard(location.ward)) return null;
  const inBounds =
    location.lat > WARD_BOUNDS.south &&
    location.lat < WARD_BOUNDS.north &&
    location.lng > WARD_BOUNDS.west &&
    location.lng < WARD_BOUNDS.east;
  if (!inBounds) return null;
  return { ...location, ward: location.ward };
}
