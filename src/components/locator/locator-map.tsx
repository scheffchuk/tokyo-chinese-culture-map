"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import type { ExpressionSpecification } from "maplibre-gl";
import { catchError } from "next/error";
import { useLocale, useTranslations } from "next-intl";

import type { PublicPlace } from "@/catalog/catalog";
import type { Position } from "@/catalog/search";
import {
  Map,
  MapControls,
  MapMarker,
  MapPopup,
  MarkerContent,
  MarkerTooltip,
  useMap,
} from "@/components/ui/map";
import { cn } from "@/lib/utils";
import { PlaceDetails } from "./place-details";

const TOKYO_CENTER: [number, number] = [139.74, 35.69];
// Free, keyless vector tiles; the style carries its own OpenStreetMap attribution.
const MAP_STYLES = { light: "https://tiles.openfreemap.org/styles/positron" };

function FlyToSelected({ place }: { place?: PublicPlace }) {
  const { map } = useMap();

  useEffect(() => {
    if (!map || !place) return;
    map.flyTo({
      center: [place.lng, place.lat],
      // Pin sits low so the popup above it fits in the viewport.
      offset: [0, map.getContainer().clientHeight * 0.3],
      zoom: Math.max(map.getZoom(), 14),
      duration: 800,
      essential: true,
    });
  }, [map, place]);

  return null;
}

/** Point basemap labels at the interface language, falling back to the local name. */
function LocalizedLabels() {
  const { map } = useMap();
  const locale = useLocale();

  useEffect(() => {
    if (!map) return;
    const keys =
      locale === "zh-Hant"
        ? ["name:zh-Hant"]
        : locale === "en"
          ? ["name:en", "name_en"]
          : ["name:ja"];
    const textField: ExpressionSpecification = [
      "coalesce",
      ...keys.map((key): ExpressionSpecification => ["get", key]),
      ["get", "name"],
    ];
    // Runs on style load rather than full load so the original labels never flash.
    const relabel = () => {
      for (const layer of map.getStyle().layers) {
        if (layer.type !== "symbol") continue;
        const current = map.getLayoutProperty(layer.id, "text-field");
        if (current && JSON.stringify(current).includes("name")) {
          map.setLayoutProperty(layer.id, "text-field", textField);
        }
      }
    };
    if (map.isStyleLoaded()) relabel();
    map.on("style.load", relabel);
    return () => {
      map.off("style.load", relabel);
    };
  }, [map, locale]);

  return null;
}

function MapUnavailable() {
  const t = useTranslations("map");
  return (
    <p
      role="status"
      className="bg-background absolute inset-x-3 top-3 z-20 rounded-lg border p-3 text-sm shadow-sm"
    >
      {t("failed")}
    </p>
  );
}

// MapLibre throws during setup when WebGL is unavailable; keep the list usable.
const MapBoundary = catchError(() => <MapUnavailable />);

function PlacePin({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        "text-background flex items-center justify-center rounded-full shadow-md transition-all",
        active
          ? "bg-foreground/80 size-9 scale-110"
          : "bg-foreground hover:bg-muted-foreground size-7",
      )}
    >
      <MapPin className={cn(active ? "size-4.5" : "size-3.5")} />
    </div>
  );
}

export function LocatorMap({
  places,
  selected,
  onSelect,
  onClearSelection,
  userPosition,
}: {
  places: PublicPlace[];
  selected?: PublicPlace;
  onSelect: (id: string) => void;
  onClearSelection: () => void;
  userPosition?: Position;
}) {
  const [basemapFailed, setBasemapFailed] = useState(false);

  return (
    <MapBoundary>
      <Map
        theme="light"
        styles={MAP_STYLES}
        center={TOKYO_CENTER}
        zoom={11}
        minZoom={9}
        maxZoom={18}
        onError={(event, map) => {
          // Only failures before the style loads leave the map blank; later tile hiccups recover on their own.
          if (map.isStyleLoaded()) console.error(event.error);
          else setBasemapFailed(true);
        }}
      >
        {basemapFailed && <MapUnavailable />}
        <MapControls showCompass />
        <LocalizedLabels />
        <FlyToSelected place={selected} />

        {places.map((place) => (
          <MapMarker
            key={place.id}
            longitude={place.lng}
            latitude={place.lat}
            onClick={() => onSelect(place.id)}
          >
            <MarkerContent>
              <button
                type="button"
                aria-label={place.name}
                aria-pressed={place.id === selected?.id}
                className="focus-visible:ring-ring rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                <PlacePin active={place.id === selected?.id} />
              </button>
            </MarkerContent>
            <MarkerTooltip
              offset={24}
              className="bg-foreground text-background"
            >
              {place.name}
            </MarkerTooltip>
          </MapMarker>
        ))}

        {userPosition && (
          <MapMarker longitude={userPosition.lng} latitude={userPosition.lat}>
            <MarkerContent />
          </MapMarker>
        )}

        {selected && (
          <MapPopup
            key={selected.id}
            longitude={selected.lng}
            latitude={selected.lat}
            anchor="bottom"
            offset={26}
            closeOnClick={false}
            focusAfterOpen={false}
            className="max-h-[60svh] w-72 max-w-[calc(100vw-2rem)] overflow-y-auto p-0"
          >
            <PlaceDetails place={selected} onClose={onClearSelection} />
          </MapPopup>
        )}
      </Map>
    </MapBoundary>
  );
}
