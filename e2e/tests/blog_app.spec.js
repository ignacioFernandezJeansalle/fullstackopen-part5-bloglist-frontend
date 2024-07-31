import { describe, beforeEach, test, expect } from "@playwright/test";

const USER_TEST = {
  name: "e2e user",
  username: "e2e username",
  password: "e2ePassword",
};

describe("Blogs app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: USER_TEST,
    });

    await page.goto("http://localhost:5173");
  });

  test("front page can be opened and has title", async ({ page }) => {
    const locator = page.getByText("Blogs app");
    await expect(locator).toBeVisible();

    await expect(page).toHaveTitle("Bloglist");
  });

  test("login form is displayed", async ({ page }) => {
    const locator = page.getByRole("heading", { name: "Login" });
    await expect(locator).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("username").fill(USER_TEST.username);
      await page.getByTestId("password").fill(USER_TEST.password);
      await page.getByRole("button", { name: "Login" }).click();

      await expect(page.getByText(USER_TEST.name)).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username").fill(USER_TEST.username);
      await page.getByTestId("password").fill(USER_TEST.password + "xxx");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(page.getByText("Wrong credentials")).toBeVisible();
    });
  });
});
