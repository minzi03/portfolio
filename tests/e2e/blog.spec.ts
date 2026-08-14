import { test, expect } from "@playwright/test";

test.describe("Blog", () => {
  test("blog list page loads", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Data Engineering Insights")).toBeVisible();
  });

  test("blog posts are listed", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");
    const postLinks = page.getByRole("link", { name: /lakehouse|kafka|dbt/i });
    const count = await postLinks.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test("blog post detail page loads", async ({ page }) => {
    await page.goto("/blog/lakehouse-architecture-guide");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: /Lakehouse/ }).first()).toBeVisible();
    await expect(page.getByText(/Back to all posts/)).toBeVisible();
  });

  test("blog post has tags", async ({ page }) => {
    await page.goto("/blog/lakehouse-architecture-guide");
    await page.waitForLoadState("networkidle");
    await expect(page.getByText(/Spark|Iceberg/).first()).toBeVisible();
  });

  test("blog breadcrumb navigation works", async ({ page }) => {
    await page.goto("/blog/lakehouse-architecture-guide");
    await page.waitForLoadState("networkidle");
    const blogLink = page.getByRole("link", { name: "Blog" }).first();
    await blogLink.click();
    await expect(page).toHaveURL(/\/blog$/);
  });
});
