import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("navbar is visible on homepage", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("link", { name: "Blog" }).first()).toBeVisible();
  });

  test("command palette opens with Ctrl+K", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.keyboard.press("Control+k");
    await page.waitForTimeout(500);
    const searchInput = page.getByPlaceholder(/search/i);
    await expect(searchInput).toBeVisible();
  });

  test("command palette search works", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.keyboard.press("Control+k");
    await page.waitForTimeout(500);
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill("Banking");
    await page.waitForTimeout(500);
    await expect(page.getByText("Banking Data Platform").first()).toBeVisible();
  });

  test("command palette closes with Escape", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.keyboard.press("Control+k");
    await page.waitForTimeout(500);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
    const searchInput = page.getByPlaceholder(/search/i);
    await expect(searchInput).not.toBeVisible();
  });

  test("footer is present", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    await expect(page.getByText("Nguyen Minh Duy").last()).toBeVisible();
  });
});
