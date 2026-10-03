import { expect, test } from "./fixtures";

test.skip(!process.env.LIVE_MAP, "Live basemap smoke check: run with pnpm test:e2e:live");

test("the real OpenFreeMap basemap renders with attribution", async ({ page }) => {
  const tiles: string[] = [];
  page.on("requestfinished", (request) => {
    if (request.url().includes("tiles.openfreemap.org")) tiles.push(request.url());
  });
  await page.goto("/en");
  await expect(page.locator(".maplibregl-canvas")).toBeVisible();
  await expect(page.getByText("OpenStreetMap")).toBeVisible({ timeout: 30_000 });
  await expect.poll(() => tiles.some((url) => url.endsWith(".pbf")), { timeout: 30_000 }).toBe(true);
  await expect(page.getByText("The background map couldn't load")).toHaveCount(0);
  await expect(page.locator("[data-label-locale='en']")).toHaveAttribute(
    "data-label-keys",
    "name:en name_en",
    { timeout: 30_000 },
  );

  await page.goto("/zh-Hant");
  await expect(page.locator("[data-label-locale='zh-Hant']")).toHaveAttribute(
    "data-label-keys",
    "name:zh-Hant",
    { timeout: 30_000 },
  );
});
