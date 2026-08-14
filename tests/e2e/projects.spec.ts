import { test, expect } from "@playwright/test";

test.describe("Projects", () => {
  test("project grid displays projects", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.getByText("Banking Data Platform").first()).toBeVisible();
  });

  test("category filter buttons exist", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.getByRole("button", { name: "All" }).first()).toBeVisible();
  });

  test("project detail page loads", async ({ page }) => {
    await page.goto("/projects/banking-data-platform");
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Banking Data Platform").first()).toBeVisible();
  });

  test("project page has architecture section", async ({ page }) => {
    await page.goto("/projects/banking-data-platform");
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Architecture").first()).toBeVisible();
  });

  test("architecture diagram has zoom controls", async ({ page }) => {
    await page.goto("/projects/banking-data-platform");
    await page.waitForLoadState("networkidle");
    await page.getByText("Architecture").first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await expect(page.getByRole("button", { name: "Zoom in" })).toBeVisible();
  });
});
