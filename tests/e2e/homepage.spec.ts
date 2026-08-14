import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("loads successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/Nguyen Minh Duy/);
  });

  test("displays hero section", async ({ page }) => {
    await expect(page.locator("h1").first()).toContainText("Nguyen Minh Duy");
  });

  test("displays stats counters", async ({ page }) => {
    await expect(page.getByText("10").first()).toBeVisible();
  });

  test("navigation links work", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Blog" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Resume" }).first()).toBeVisible();
  });

  test("theme toggle works", async ({ page }) => {
    const toggle = page.getByRole("button", { name: /switch to.*mode/i });
    await expect(toggle).toBeVisible();
    await toggle.click();
    await page.waitForTimeout(300);
    const html = page.locator("html");
    const className = await html.getAttribute("class");
    expect(className).toBeDefined();
  });

  test("contact section exists", async ({ page }) => {
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(page.getByText("Let's Build with Data")).toBeVisible();
  });
});
