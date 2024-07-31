import { describe, test, expect } from "@playwright/test";

describe("Blogs app", () => {
  test("front page can be opened and has title", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const locator = page.getByText("Blogs app");
    await expect(locator).toBeVisible();

    await expect(page).toHaveTitle("Bloglist");
  });

  test("login form is displayed", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const locator = page.getByRole("heading", { name: "Login" });
    await expect(locator).toBeVisible();
  });
});
