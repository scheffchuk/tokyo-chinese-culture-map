"use client";

import { useEffect, useRef } from "react";
import { LocateFixed, Search, X } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

import type { PublicPlace } from "@/catalog/catalog";
import { CATEGORIES, WARDS } from "@/catalog/catalog";
import type { NearMe, PlaceFilters } from "@/catalog/search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const selectClassName =
  "border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full min-w-0 rounded-lg border px-2 text-sm outline-none focus-visible:ring-3";

export function PlaceList({
  className,
  places,
  results,
  filters,
  onFiltersChange,
  selectedId,
  onSelect,
  unavailable,
  onDismissUnavailable,
  nearMe,
  onLocate,
  onStopNearMe,
}: {
  className?: string;
  places: PublicPlace[];
  results: { place: PublicPlace; distance: number | undefined }[];
  filters: PlaceFilters;
  onFiltersChange: (changes: Partial<PlaceFilters>) => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
  unavailable: boolean;
  onDismissUnavailable: () => void;
  nearMe: NearMe;
  onLocate: () => void;
  onStopNearMe: () => void;
}) {
  const t = useTranslations();
  const format = useFormatter();
  const itemRefs = useRef(new Map<string, HTMLButtonElement>());
  const wardOptions = WARDS.filter((ward) =>
    places.some((place) => place.ward === ward),
  );
  const filtered =
    filters.query !== "" || filters.category !== null || filters.ward !== null;

  useEffect(() => {
    if (!selectedId) return;
    itemRefs.current
      .get(selectedId)
      ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedId]);

  return (
    <aside
      className={cn(
        "bg-sidebar flex w-full shrink-0 flex-col md:w-96 md:border-r",
        className,
      )}
    >
      <div className="flex flex-col gap-2 border-b p-4">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
          <Input
            type="search"
            value={filters.query}
            onChange={(e) => onFiltersChange({ query: e.target.value })}
            placeholder={t("search.placeholder")}
            aria-label={t("search.label")}
            className="bg-background pl-8"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <select
            aria-label={t("filters.category")}
            value={filters.category ?? ""}
            onChange={(e) =>
              onFiltersChange({
                category:
                  CATEGORIES.find((id) => id === e.target.value) ?? null,
              })
            }
            className={selectClassName}
          >
            <option value="">{t("filters.allCategories")}</option>
            {CATEGORIES.map((id) => (
              <option key={id} value={id}>
                {t(`categories.${id}`)}
              </option>
            ))}
          </select>
          <select
            aria-label={t("filters.ward")}
            value={filters.ward ?? ""}
            onChange={(e) =>
              onFiltersChange({
                ward: WARDS.find((id) => id === e.target.value) ?? null,
              })
            }
            className={selectClassName}
          >
            <option value="">{t("filters.allWards")}</option>
            {wardOptions.map((id) => (
              <option key={id} value={id}>
                {t(`wards.${id}`)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p aria-live="polite" className="text-muted-foreground text-sm">
            {t("results.count", { count: results.length })}
          </p>
          <div className="flex items-center gap-1">
            {filtered && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  onFiltersChange({ query: "", category: null, ward: null })
                }
              >
                {t("filters.clear")}
              </Button>
            )}
            {nearMe.status === "ready" ? (
              <Button variant="outline" size="sm" onClick={onStopNearMe}>
                <X />
                {t("nearMe.stop")}
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={onLocate}
                disabled={nearMe.status === "locating"}
              >
                <LocateFixed />
                {nearMe.status === "locating"
                  ? t("nearMe.locating")
                  : t("nearMe.button")}
              </Button>
            )}
          </div>
        </div>
        {nearMe.status === "ready" && (
          <p className="text-muted-foreground text-xs">{t("nearMe.active")}</p>
        )}
        {nearMe.status === "error" && (
          <p role="status" className="text-muted-foreground text-xs">
            {t(`nearMe.${nearMe.reason}`)}
          </p>
        )}
        {unavailable && (
          <div
            role="alert"
            className="bg-background flex items-start justify-between gap-2 rounded-lg border p-3 text-sm"
          >
            <div>
              <p className="font-medium">{t("unavailable.title")}</p>
              <p className="text-muted-foreground">{t("unavailable.body")}</p>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onDismissUnavailable}
              aria-label={t("unavailable.dismiss")}
            >
              <X />
            </Button>
          </div>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {results.length === 0 ? (
          <div className="p-6 text-center text-sm">
            <p className="font-medium">{t("results.empty")}</p>
            <p className="text-muted-foreground mt-1">
              {t("results.emptyHint")}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() =>
                onFiltersChange({ query: "", category: null, ward: null })
              }
            >
              {t("filters.clear")}
            </Button>
          </div>
        ) : (
          <ul aria-label={t("results.label")} className="flex flex-col gap-1 p-2">
            {results.map(({ place, distance }) => {
              const active = place.id === selectedId;
              return (
                <li
                  key={place.id}
                  className={cn(
                    "rounded-md",
                    active ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/60",
                  )}
                >
                  <button
                    type="button"
                    ref={(el) => {
                      if (el) itemRefs.current.set(place.id, el);
                      else itemRefs.current.delete(place.id);
                    }}
                    onClick={() => onSelect(place.id)}
                    aria-current={active ? "true" : undefined}
                    className="focus-visible:ring-ring flex w-full flex-col gap-1 rounded-md p-3 text-left text-sm outline-none focus-visible:ring-2"
                  >
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="text-foreground font-medium">
                        {place.name}
                      </span>
                      {distance !== undefined && (
                        <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                          {t("nearMe.distance", {
                            km: format.number(distance, {
                              maximumFractionDigits: 1,
                            }),
                          })}
                        </span>
                      )}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {t(`categories.${place.category}`)} ·{" "}
                      {t(`wards.${place.ward}`)}
                    </span>
                    <span className="text-muted-foreground line-clamp-2 text-xs">
                      {place.description}
                    </span>
                  </button>
                  {active && (
                    <div className="flex flex-col gap-1 px-3 pb-3 text-xs">
                      <p lang="ja" className="text-muted-foreground">
                        {place.address}
                      </p>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground w-fit underline underline-offset-2"
                      >
                        {t("place.directions")}
                      </a>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
