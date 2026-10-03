import { expect, test } from "./fixtures";

test("phones switch between list and map without losing search or selection", async ({
  page,
}) => {
  await page.goto("/");
  const list = page.getByRole("list", { name: "検索結果" });
  const map = page.getByRole("region", { name: "スポットの地図" });
  await expect(list).toBeVisible();
  await expect(map).toBeHidden();

  await page.getByLabel("スポットを検索").fill("gallery");
  await page.getByRole("button", { name: "地図" }).click();
  await expect(map).toBeVisible();
  await expect(list).toBeHidden();

  await page.getByRole("button", { name: "リスト" }).click();
  await expect(page.getByLabel("スポットを検索")).toHaveValue("gallery");
  await expect(page.getByText("1件のスポット")).toBeVisible();

  await list.getByRole("button", { name: /ＴＥＳＴ/ }).click();
  await expect(map).toBeVisible();
  await expect(
    page.getByRole("article", { name: "ＴＥＳＴ　Ｇａｌｌｅｒｙの詳細" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Googleマップで経路" })).toBeVisible();
});
