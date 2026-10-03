"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import type { PublicPlace } from "@/catalog/catalog";
import { CATEGORIES, WARDS } from "@/catalog/catalog";
import type { NearMe, PlaceFilters } from "@/catalog/search";
import { distanceKm, filterPlaces } from "@/catalog/search";
import { cn } from "@/lib/utils";
import { LocatorMap } from "./locator-map";
import { PlaceList } from "./place-list";

function pick<T extends string>(options: readonly T[], value: string | null) {
  return options.find((option) => option === value) ?? null;
}

/** Search, filters, selection and mobile view live in the URL so links and language switches restore them. */
export function Locator({ places }: { places: PublicPlace[] }) {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const [nearMe, setNearMe] = useState<NearMe>({ status: "idle" });
  // Local so typing never waits on a URL round-trip; mirrored into `?q=`.
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");

  const filters: PlaceFilters = {
    query,
    category: pick(CATEGORIES, searchParams.get("category")),
    ward: pick(WARDS, searchParams.get("ward")),
  };
  const view = searchParams.get("view") === "map" ? "map" : "list";
  const selectedId = searchParams.get("place");

  const matching = filterPlaces(places, filters);
  const results =
    nearMe.status === "ready"
      ? matching
          .map((place) => ({
            place,
            distance: distanceKm(nearMe.position, place),
          }))
          .sort((a, b) => a.distance - b.distance)
      : matching.map((place) => ({ place, distance: undefined }));
  const selected = matching.find((place) => place.id === selectedId);
  const unavailable =
    selectedId !== null && !places.some((place) => place.id === selectedId);

  function navigate(
    changes: Record<string, string | null>,
    mode: "push" | "replace",
  ) {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    const query = next.toString();
    const url = `${window.location.pathname}${query ? `?${query}` : ""}`;
    if (mode === "push") window.history.pushState(null, "", url);
    else window.history.replaceState(null, "", url);
  }

  function changeFilters(changes: Partial<PlaceFilters>) {
    const nextFilters = { ...filters, ...changes };
    const keepSelection = filterPlaces(places, nextFilters).some(
      (place) => place.id === selectedId,
    );
    setQuery(nextFilters.query);
    navigate(
      {
        q: nextFilters.query,
        category: nextFilters.category,
        ward: nextFilters.ward,
        place: keepSelection ? selectedId : null,
      },
      "replace",
    );
  }

  function locate() {
    if (!("geolocation" in navigator)) {
      setNearMe({ status: "error", reason: "unsupported" });
      return;
    }
    setNearMe({ status: "locating" });
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        setNearMe({
          status: "ready",
          position: { lat: coords.latitude, lng: coords.longitude },
        }),
      (error) =>
        setNearMe({
          status: "error",
          reason:
            error.code === error.PERMISSION_DENIED
              ? "denied"
              : error.code === error.TIMEOUT
                ? "timeout"
                : "unavailable",
        }),
      { timeout: 10_000, maximumAge: 60_000 },
    );
  }

  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <div
        role="group"
        aria-label={t("view.label")}
        className="grid shrink-0 grid-cols-2 gap-1 border-b p-2 md:hidden"
      >
        {(["list", "map"] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={view === option}
            onClick={() =>
              navigate({ view: option === "map" ? "map" : null }, "replace")
            }
            className={cn(
              "focus-visible:ring-ring rounded-md py-1.5 text-sm font-medium outline-none focus-visible:ring-2",
              view === option
                ? "bg-secondary text-foreground"
                : "text-muted-foreground",
            )}
          >
            {t(`view.${option}`)}
          </button>
        ))}
      </div>

      <div className="flex min-h-0 flex-1">
        <PlaceList
          className={cn(view === "map" && "max-md:hidden")}
          places={places}
          results={results}
          filters={filters}
          onFiltersChange={changeFilters}
          selectedId={selected?.id ?? null}
          onSelect={(id) => navigate({ place: id, view: "map" }, "push")}
          unavailable={unavailable}
          onDismissUnavailable={() => navigate({ place: null }, "replace")}
          nearMe={nearMe}
          onLocate={locate}
          onStopNearMe={() => setNearMe({ status: "idle" })}
        />
        <section
          aria-label={t("map.label")}
          className={cn(
            "relative min-w-0 flex-1",
            view === "list" && "max-md:hidden",
          )}
        >
          <LocatorMap
            places={matching}
            selected={selected}
            onSelect={(id) => navigate({ place: id }, "push")}
            onClearSelection={() => navigate({ place: null }, "replace")}
            userPosition={
              nearMe.status === "ready" ? nearMe.position : undefined
            }
          />
        </section>
      </div>
    </main>
  );
}
