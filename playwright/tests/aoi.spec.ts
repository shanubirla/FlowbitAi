import { test, expect } from "@playwright/test";

test("user can create an AOI from map click", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  const map = page.locator(".leaflet-container");
  const bbox = await map.boundingBox();
  if (!bbox) throw new Error("No map bounding box");

  // Click roughly in the center of the map
  await page.mouse.click(bbox.x + bbox.width / 2, bbox.y + bbox.height / 2);

  await page.getByLabel("Name").fill("Test AOI");
  await page.getByRole("button", { name: /save aoi/i }).click();

  await expect(page.getByText("AOIs (1)")).toBeVisible();
  await expect(page.getByText("Test AOI")).toBeVisible();
});
