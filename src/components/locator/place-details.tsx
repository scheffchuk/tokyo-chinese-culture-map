"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Clock,
  ExternalLink,
  ImageOff,
  Link2,
  MapPin,
  Navigation,
  X,
} from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

import type { PublicPlace } from "@/catalog/catalog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PlaceDetails({
  place,
  onClose,
}: {
  place: PublicPlace;
  onClose: () => void;
}) {
  const t = useTranslations();
  const format = useFormatter();
  const [copied, setCopied] = useState(false);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;

  async function copyLink() {
    const url = new URL(window.location.pathname, window.location.origin);
    url.searchParams.set("place", place.id);
    await navigator.clipboard.writeText(url.toString());
    setCopied(true);
  }

  return (
    <article
      aria-label={t("place.details", { name: place.name })}
      className="text-popover-foreground text-xs"
    >
      <div
        className={cn(
          "bg-muted relative overflow-hidden rounded-t-md",
          place.photo ? "aspect-video" : "h-12",
        )}
      >
        {place.photo ? (
          <Image
            src={place.photo.src}
            alt={place.photo.alt}
            fill
            sizes="18rem"
            className="object-cover"
          />
        ) : (
          <div className="text-muted-foreground flex h-full items-center gap-1.5 px-3">
            <ImageOff className="size-4" aria-hidden />
            <span>{t("place.noPhoto")}</span>
          </div>
        )}
        <Button
          variant="secondary"
          size="icon-xs"
          onClick={onClose}
          aria-label={t("place.close")}
          className="absolute top-2 right-2 shadow-sm"
        >
          <X />
        </Button>
      </div>
      {place.photo?.credit && (
        <p className="text-muted-foreground px-3 pt-1 text-[0.65rem]">
          {t("place.photoCredit", { credit: place.photo.credit })}
        </p>
      )}

      <div className="space-y-2.5 p-3">
        <div>
          <h2 className="text-sm font-semibold">{place.name}</h2>
          {place.alternateNames.length > 0 && (
            <p className="text-muted-foreground">
              <span className="sr-only">{t("place.alternateNames")}: </span>
              {place.alternateNames.join(" / ")}
            </p>
          )}
          <p className="text-muted-foreground mt-1">
            {t(`categories.${place.category}`)} · {t(`wards.${place.ward}`)}
          </p>
        </div>

        <p>{place.description}</p>

        <dl className="text-muted-foreground space-y-1.5">
          <div className="flex gap-1.5">
            <dt>
              <MapPin className="size-3.5" aria-hidden />
              <span className="sr-only">{t("place.address")}</span>
            </dt>
            <dd lang="ja">{place.address}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt>
              <Clock className="size-3.5" aria-hidden />
              <span className="sr-only">{t("place.hours")}</span>
            </dt>
            <dd>{place.hours ?? t("place.hoursUnknown")}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-1.5">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "sm" }))}
          >
            <Navigation />
            {t("place.directions")}
          </a>
          {place.website && (
            <a
              href={place.website}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              <ExternalLink />
              {t("place.website")}
            </a>
          )}
          <Button variant="outline" size="sm" onClick={copyLink}>
            <Link2 />
            {copied ? t("place.copied") : t("place.share")}
          </Button>
        </div>

        <div className="text-muted-foreground border-t pt-2 text-[0.7rem]">
          <p>
            {t("place.sources")} ·{" "}
            {t("place.verified", {
              date: format.dateTime(new Date(place.verifiedOn), {
                dateStyle: "medium",
              }),
            })}
          </p>
          <ul className="mt-1 space-y-0.5">
            {place.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground underline underline-offset-2"
                >
                  {source.label}
                </a>{" "}
                (
                {source.primary
                  ? t("place.primarySource")
                  : t("place.thirdPartySource")}
                )
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
