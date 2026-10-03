import { expect, test as base, type Page } from "@playwright/test";

const BASEMAP = "https://tiles.openfreemap.org/**";

/** Every test gets a tile-less basemap so runs are fast and independent of the provider. */
export const test = base.extend<{ stubBasemap: void }>({
  stubBasemap: [
    async ({ page }, use) => {
      if (!process.env.LIVE_MAP) {
        await page.route(BASEMAP, (route) =>
          route.fulfill({
            json: {
              version: 8,
              sources: {},
              layers: [
                {
                  id: "background",
                  type: "background",
                  paint: { "background-color": "#eeeeee" },
                },
              ],
            },
          }),
        );
      }
      await use();
    },
    { auto: true },
  ],
});

export { expect };

export async function failBasemap(page: Page) {
  await page.unroute(BASEMAP);
  await page.route(BASEMAP, (route) => route.abort());
}

/** Records geolocation calls and answers them with `outcome`, before any app code runs. */
export async function stubGeolocation(
  page: Page,
  outcome:
    | { lat: number; lng: number }
    | { errorCode: 1 | 2 | 3 },
) {
  await page.addInitScript((result) => {
    const calls = { count: 0 };
    Object.defineProperty(window, "__geoCalls", { get: () => calls.count });
    const getCurrentPosition: Geolocation["getCurrentPosition"] = (
      success,
      error,
    ) => {
      calls.count += 1;
      setTimeout(() => {
        if ("errorCode" in result) {
          error?.({
            code: result.errorCode,
            message: "stub",
            PERMISSION_DENIED: 1,
            POSITION_UNAVAILABLE: 2,
            TIMEOUT: 3,
          } as GeolocationPositionError);
        } else {
          success({
            coords: { latitude: result.lat, longitude: result.lng },
            timestamp: Date.now(),
          } as GeolocationPosition);
        }
      }, 50);
    };
    Object.defineProperty(navigator, "geolocation", {
      value: { getCurrentPosition },
    });
  }, outcome);
}

export function geoCalls(page: Page) {
  return page.evaluate(() => Reflect.get(window, "__geoCalls") as number);
}
