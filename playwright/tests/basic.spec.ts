import { test, expect } from "@playwright/test";

test("app loads and shows AOI UI", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await expect(page.getByText("AOI Creation")).toBeVisible();
  await expect(page.getByText("Create AOI")).toBeVisible();

  const map = page.locator(".leaflet-container");
  await expect(map).toBeVisible();
});
