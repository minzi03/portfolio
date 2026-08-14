import { test, expect } from "@playwright/test";

test.describe("Credentials", () => {
  test("credentials page loads", async ({ page }) => {
    await page.goto("/credentials");
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Credentials").first()).toBeVisible();
  });

  test("credentials page has content", async ({ page }) => {
    await page.goto("/credentials");
    await page.waitForLoadState("networkidle");
    // Check that the page has some content
    await expect(page.locator("main").first()).not.toBeEmpty();
  });
});

test.describe("Resume", () => {
  test("resume page loads", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Resume").first()).toBeVisible();
  });
});
