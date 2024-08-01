import { describe, beforeEach, test, expect } from "@playwright/test";
import helper from "./helper";

const USER_TEST = {
  name: "e2e user",
  username: "e2e username",
  password: "e2ePassword",
};

describe("Blogs app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: USER_TEST,
    });

    await page.goto("/");
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
      await helper.loginWith(page, USER_TEST.username, USER_TEST.password);

      const userInfo = page.locator(".user-info");
      await expect(userInfo).toContainText(USER_TEST.name);
    });

    test("fails with wrong credentials", async ({ page }) => {
      await helper.loginWith(page, USER_TEST.username, "wrongPassword");

      const notification = page.locator(".notification");
      await expect(notification).toContainText("Wrong credentials");
      await expect(notification).toHaveCSS("border-style", "solid");
      await expect(notification).toHaveCSS("color", "rgb(255, 0, 0)");
      await expect(page.getByText(USER_TEST.name)).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await helper.loginWith(page, USER_TEST.username, USER_TEST.password);
    });

    test("a new blog can be created", async ({ page }) => {
      const NEW_BLOG = {
        title: "new test blog title",
        author: "new test blog author",
        url: "www.newblogtest.com",
      };

      await page.getByRole("button", { name: "Create new blog" }).click();

      await page.getByTestId("title").fill(NEW_BLOG.title);
      await page.getByTestId("author").fill(NEW_BLOG.author);
      await page.getByTestId("url").fill(NEW_BLOG.url);
      await page.getByTestId("submit-button").click();

      const notification = page.locator(".notification");
      await expect(notification).toContainText(`A new blog: ${NEW_BLOG.title} by ${NEW_BLOG.author}`);
      await expect(notification).toHaveCSS("border-style", "solid");
      await expect(notification).toHaveCSS("color", "rgb(0, 128, 0)");

      const blog = page
        .getByRole("listitem")
        .filter({ hasText: `${NEW_BLOG.title.toUpperCase()} - ${NEW_BLOG.author}` });
      await expect(blog).toBeVisible();
    });
  });
});
