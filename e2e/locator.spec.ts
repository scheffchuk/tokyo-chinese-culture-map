import { expect, failBasemap, geoCalls, stubGeolocation, test } from "./fixtures";

const results = (page: import("@playwright/test").Page) =>
  page.getByRole("list", { name: /検索結果|Results|搜尋結果/ });
const result = (page: import("@playwright/test").Page, name: string | RegExp) =>
  results(page).getByRole("button", { name });
// Next's route announcer is also an alert, so match ours by text.
const unavailableNotice = (page: import("@playwright/test").Page) =>
  page.getByRole("alert").filter({ hasText: "このスポットは表示できません" });

test.describe("publication and language", () => {
  test("a fresh visit is Japanese and lists only published, in-scope places", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "ja");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("東京中華文化マップ");
    await expect(page.getByText("4件のスポット")).toBeVisible();
    await expect(result(page, /神田テスト書店/)).toContainText("書店 · 千代田区");
    await expect(page.getByText("未公開ドラフト書店")).toHaveCount(0);
    await expect(page.getByText(/川口スタジオ/)).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Hidden Draft Books" })).toHaveCount(0);
  });

  test("switching to English translates labels and descriptions but keeps Japanese addresses", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "English" }).click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByText("4 places")).toBeVisible();
    await result(page, /神田テスト書店/).click();
    const details = page.getByRole("article", { name: "Details for 神田テスト書店" });
    await expect(details).toContainText("Bookstores · Chiyoda");
    await expect(details).toContainText("Bookshop specialising in Chinese-language humanities.");
    await expect(details).toContainText("東京都千代田区神田神保町1-1");
    await expect(details).toContainText("11:00–19:00 (closed Mon)");
  });

  test("Traditional Chinese is available and changing language keeps search, filters and selection", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByLabel("カテゴリー").selectOption("galleries");
    await page.getByLabel("スポットを検索").fill("chiyoda");
    await result(page, /千代田アートルーム/).click();
    await page.getByRole("link", { name: "繁體中文" }).click();

    await expect(page).toHaveURL(/\/zh-Hant\?.*place=fx-chiyoda-art/);
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-Hant");
    await expect(page.getByLabel("搜尋地點")).toHaveValue("chiyoda");
    await expect(page.getByLabel("類別")).toHaveValue("galleries");
    await expect(page.getByText("1 個地點")).toBeVisible();
    await expect(
      page.getByRole("article", { name: "千代田アートルーム的詳細資訊" }),
    ).toContainText("小型當代藝術展間。");
  });
});

test.describe("search and filters", () => {
  test("search matches names, descriptions, tags and wards in any language and width", async ({
    page,
  }) => {
    await page.goto("/en");
    const search = page.getByLabel("Search places");
    const expectOnly = async (query: string, name: RegExp) => {
      await search.fill(query);
      await expect(page.getByText("1 place", { exact: true })).toBeVisible();
      await expect(result(page, name)).toBeVisible();
    };

    await expectOnly("神田測試", /神田テスト書店/);
    await expectOnly("神田测试书店", /神田テスト書店/);
    await expectOnly("烏龍", /茶居/);
    await expectOnly("中国茶", /茶居/);
    await expectOnly("test gallery", /ＴＥＳＴ/);
    await expectOnly("渋谷区", /ＴＥＳＴ/);
    await expectOnly("  CHAJU   tea ", /茶居/);
  });

  test("category and ward filters combine with each other and the result count", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByLabel("カテゴリー").selectOption("galleries");
    await expect(page.getByText("2件のスポット")).toBeVisible();
    await page.getByLabel("区", { exact: true }).selectOption("chiyoda");
    await expect(page.getByText("1件のスポット")).toBeVisible();
    await expect(result(page, /千代田アートルーム/)).toBeVisible();
    await expect(page).toHaveURL(/category=galleries/);
    await expect(page).toHaveURL(/ward=chiyoda/);
  });

  test("an empty result explains itself and can be cleared", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("スポットを検索").fill("存在しない");
    await expect(page.getByText("条件に合うスポットはありません。")).toBeVisible();
    await page.getByRole("button", { name: "条件をクリア" }).last().click();
    await expect(page.getByText("4件のスポット")).toBeVisible();
    await expect(page.getByLabel("スポットを検索")).toHaveValue("");
  });
});

test.describe("selection, popup and sharing", () => {
  test("list and markers select the same place with a single rich popup", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "テスト茶館 茶居", exact: true }).click();
    await expect(result(page, /茶居/)).toHaveAttribute("aria-current", "true");
    await expect(page.getByRole("article", { name: "テスト茶館 茶居の詳細" })).toBeVisible();

    await result(page, /神田テスト書店/).click();
    await expect(page.getByRole("article")).toHaveCount(1);
    const details = page.getByRole("article", { name: "神田テスト書店の詳細" });
    await expect(details).toBeVisible();
    await expect(details).toContainText("11:00–19:00（月曜定休）");
    await expect(details.getByRole("link", { name: "公式サイト・SNS" })).toHaveAttribute(
      "href",
      "https://example.com/kanda",
    );
    await expect(details.getByRole("link", { name: "Kanda Test Books" })).toHaveAttribute(
      "href",
      "https://example.com/kanda/about",
    );
    await expect(details).toContainText("運営者による情報");
    await expect(details).toContainText("第三者による情報");
    await expect(details).toContainText("2026/09/30に確認");
    await expect(page.getByRole("button", { name: "神田テスト書店", exact: true })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  test("missing hours, photo and website are stated truthfully", async ({ page }) => {
    await page.goto("/?place=fx-shinagawa-tea");
    const details = page.getByRole("article", { name: "テスト茶館 茶居の詳細" });
    await expect(details).toContainText("営業時間の情報はありません");
    await expect(details).toContainText("写真はありません");
    await expect(details.getByRole("link", { name: "公式サイト・SNS" })).toHaveCount(0);
  });

  test("directions open Google Maps at the published coordinates", async ({ page }) => {
    await page.goto("/?place=fx-shinagawa-tea");
    await expect(
      page.getByRole("article").getByRole("link", { name: "Googleマップで経路" }),
    ).toHaveAttribute(
      "href",
      "https://www.google.com/maps/dir/?api=1&destination=35.6053,139.7038",
    );
  });

  test("a filter that excludes the selected place clears the selection", async ({ page }) => {
    await page.goto("/?place=fx-shinagawa-tea");
    await expect(page.getByRole("article")).toBeVisible();
    await page.getByLabel("カテゴリー").selectOption("bookstores");
    await expect(page.getByRole("article")).toHaveCount(0);
    await expect(page).not.toHaveURL(/place=/);
    await expect(unavailableNotice(page)).toHaveCount(0);
  });

  test("a copied link restores the place and language on a fresh visit", async ({
    page,
    context,
    browser,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/en");
    await result(page, /ＴＥＳＴ/).click();
    await page.getByRole("button", { name: "Copy link" }).click();
    await expect(page.getByRole("button", { name: "Link copied" })).toBeVisible();
    const link = await page.evaluate(() => navigator.clipboard.readText());
    expect(link).toMatch(/\/en\?place=fx-shibuya-gallery$/);

    const fresh = await browser.newPage();
    await fresh.goto(link);
    await expect(
      fresh.getByRole("article", { name: "Details for ＴＥＳＴ　Ｇａｌｌｅｒｙ" }),
    ).toContainText("Gallery focused on photography shows.");
    await fresh.close();
  });

  test("browser back restores the search the url had", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("スポットを検索").fill("茶");
    await result(page, /茶居/).click();
    await page.getByLabel("スポットを検索").fill("神田");
    await expect(page.getByLabel("スポットを検索")).toHaveValue("神田");
    await page.goBack();
    await expect(page.getByLabel("スポットを検索")).toHaveValue("茶");
    await expect(result(page, /茶居/)).toBeVisible();
  });

  test("browser back and forward move between selections", async ({ page }) => {
    await page.goto("/");
    await result(page, /神田テスト書店/).click();
    await result(page, /茶居/).click();
    await page.goBack();
    await expect(page.getByRole("article", { name: "神田テスト書店の詳細" })).toBeVisible();
    await page.goForward();
    await expect(page.getByRole("article", { name: "テスト茶館 茶居の詳細" })).toBeVisible();
  });

  for (const id of ["fx-draft", "fx-out-of-scope", "fx-unresolved", "no-such-place"]) {
    test(`unpublished or unknown id ${id} shows a recoverable notice`, async ({ page }) => {
      await page.goto(`/?place=${id}`);
      const notice = unavailableNotice(page);
      await expect(notice).toBeVisible();
      await expect(page.getByRole("article")).toHaveCount(0);
      await expect(page.getByText("4件のスポット")).toBeVisible();
      await notice.getByRole("button", { name: "閉じる" }).click();
      await expect(notice).toHaveCount(0);
      await expect(page).not.toHaveURL(/place=/);
    });
  }
});

test.describe("near me", () => {
  test("location is requested only on demand and sorts matches by straight-line distance", async ({
    page,
  }) => {
    await stubGeolocation(page, { lat: 35.605, lng: 139.704 });
    await page.goto("/en");
    await expect(page.getByText("4 places")).toBeVisible();
    expect(await geoCalls(page)).toBe(0);

    await page.getByRole("button", { name: "Near me" }).click();
    await expect(page.getByText("Sorted by straight-line distance")).toBeVisible();
    expect(await geoCalls(page)).toBe(1);
    const names = results(page).getByRole("button");
    await expect(names.first()).toContainText("茶居");
    await expect(names.first()).toContainText(/0 km away/);
    await expect(names.last()).toContainText("神田テスト書店");
  });

  test("near me keeps category filters active", async ({ page }) => {
    await stubGeolocation(page, { lat: 35.605, lng: 139.704 });
    await page.goto("/en?category=galleries");
    await page.getByRole("button", { name: "Near me" }).click();
    const names = results(page).getByRole("button");
    await expect(names).toHaveCount(2);
    await expect(names.first()).toContainText("ＴＥＳＴ");
    await expect(names.last()).toContainText("千代田アートルーム");
  });

  for (const [errorCode, message] of [
    [1, "Location permission was denied"],
    [2, "Your location is unavailable"],
    [3, "Finding your location took too long"],
  ] as const) {
    test(`geolocation error ${errorCode} is explained and browsing continues`, async ({ page }) => {
      await stubGeolocation(page, { errorCode });
      await page.goto("/en");
      await page.getByRole("button", { name: "Near me" }).click();
      await expect(page.getByRole("status").filter({ hasText: message })).toBeVisible();
      await expect(page.getByText("4 places")).toBeVisible();
      await result(page, /茶居/).click();
      await expect(page.getByRole("article")).toBeVisible();
    });
  }
});

test.describe("accessibility and resilience", () => {
  test("results and markers work from the keyboard", async ({ page }) => {
    await page.goto("/");
    await result(page, /神田テスト書店/).focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("article", { name: "神田テスト書店の詳細" })).toBeVisible();

    await page.getByRole("button", { name: "テスト茶館 茶居", exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("article", { name: "テスト茶館 茶居の詳細" })).toBeVisible();
    await page.getByRole("button", { name: "閉じる" }).press("Enter");
    await expect(page.getByRole("article")).toHaveCount(0);
  });

  test("the directory stays usable when the basemap fails", async ({ page }) => {
    await failBasemap(page);
    await page.goto("/");
    await expect(page.getByText("背景地図を読み込めませんでした")).toBeVisible();
    await page.getByLabel("スポットを検索").fill("茶居");
    await expect(page.getByText("1件のスポット")).toBeVisible();
    await result(page, /茶居/).click();
    await expect(results(page)).toContainText("東京都品川区旗の台3-1");
    await expect(
      results(page).getByRole("link", { name: "Googleマップで経路" }),
    ).toBeVisible();
    await expect(
      page.getByRole("article").getByRole("link", { name: "Googleマップで経路" }),
    ).toBeVisible();
  });
});
