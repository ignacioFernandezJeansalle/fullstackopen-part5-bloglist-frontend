import { describe, beforeEach, test, expect } from "@playwright/test";
import helper from "./helper";

const USER_TEST = {
  name: "e2e user",
  username: "e2e username",
  password: "e2ePassword",
};

const OTHER_USER_TEST = {
  name: "e2e other user",
  username: "e2e other username",
  password: "e2ePassword",
};

const NEW_BLOG = {
  title: "new test blog title",
  author: "new test blog author",
  url: "www.newblogtest.com",
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
      await helper.createBlog(page, NEW_BLOG);

      const notification = page.locator(".notification");
      await expect(notification).toContainText(`A new blog: ${NEW_BLOG.title} by ${NEW_BLOG.author}`);
      await expect(notification).toHaveCSS("border-style", "solid");
      await expect(notification).toHaveCSS("color", "rgb(0, 128, 0)");

      const blog = page
        .getByRole("listitem")
        .filter({ hasText: `${NEW_BLOG.title.toUpperCase()} - ${NEW_BLOG.author}` });

      await expect(blog).toBeVisible();
    });

    test("a blog can be edited", async ({ page }) => {
      await helper.createBlog(page, NEW_BLOG);

      const blog = page
        .getByRole("listitem")
        .filter({ hasText: `${NEW_BLOG.title.toUpperCase()} - ${NEW_BLOG.author}` });

      await blog.getByTestId("view-button").click();

      const likesAtStart = blog.getByText("likes: 0");
      await expect(likesAtStart).toBeVisible();

      await blog.getByTestId("like-button").click();

      const likesAtEnd = blog.getByText("likes: 1");
      await expect(likesAtEnd).toBeVisible();
    });

    test("a blog can be deleted", async ({ page }) => {
      await helper.createBlog(page, NEW_BLOG);

      const numberOfBlogsAsStart = page.locator(".list-of-blogs").getByRole("listitem");
      await expect(numberOfBlogsAsStart).toHaveCount(1);

      const blog = page
        .getByRole("listitem")
        .filter({ hasText: `${NEW_BLOG.title.toUpperCase()} - ${NEW_BLOG.author}` });

      await blog.getByTestId("view-button").click();

      page.on("dialog", (dialog) => dialog.accept());
      await blog.getByTestId("remove-button").click();

      await expect(numberOfBlogsAsStart).toHaveCount(0);
    });

    test("only the creator of the blog can see the delete button", async ({ page, request }) => {
      await helper.createBlog(page, NEW_BLOG);

      const blog = page
        .getByRole("listitem")
        .filter({ hasText: `${NEW_BLOG.title.toUpperCase()} - ${NEW_BLOG.author}` });

      await page.pause();
      await blog.getByTestId("view-button").click();
      await expect(blog.getByTestId("remove-button")).toBeVisible();

      await helper.logout(page);

      // create an alternative user
      await request.post("/api/users", {
        data: OTHER_USER_TEST,
      });

      await helper.loginWith(page, OTHER_USER_TEST.username, OTHER_USER_TEST.password);

      await blog.getByTestId("view-button").click();
      await expect(blog.getByText("likes: 0")).toBeVisible();
      await expect(blog.getByTestId("remove-button")).not.toBeVisible();
    });
  });
});
