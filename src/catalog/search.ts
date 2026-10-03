import type { CategoryId, PublicPlace, WardId } from "./catalog";
import { normalizeSearchText } from "./catalog";

export type PlaceFilters = {
  query: string;
  category: CategoryId | null;
  ward: WardId | null;
};

export function filterPlaces(places: PublicPlace[], filters: PlaceFilters) {
  const query = normalizeSearchText(filters.query);
  return places.filter(
    (place) =>
      (!filters.category || place.category === filters.category) &&
      (!filters.ward || place.ward === filters.ward) &&
      (!query || place.searchText.includes(query)),
  );
}

export type Position = { lat: number; lng: number };

export type NearMe =
  | { status: "idle" | "locating" }
  | { status: "ready"; position: Position }
  | {
      status: "error";
      reason: "denied" | "unavailable" | "timeout" | "unsupported";
    };

/** Great-circle (straight-line) distance in kilometres; not travel distance. */
export function distanceKm(from: Position, to: Position) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(to.lat - from.lat);
  const dLng = toRad(to.lng - from.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(from.lat)) * Math.cos(toRad(to.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}
