import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormBlog from "./FormBlog";

describe("<FormBlog />", () => {
  const NEW_BLOG_TITLE = "New blog title";
  const NEW_BLOG_AUTHOR = "New blog author";
  const NEW_BLOG_URL = "New blog url";

  const SUBMIT_FORM = vi.fn();

  let container;
  beforeEach(() => {
    container = render(<FormBlog handleSubmit={SUBMIT_FORM} />).container;
  });

  test("clicking submit button calls event handler", async () => {
    const user = userEvent.setup();
    const $inputBlogTitle = container.querySelector("#blog-title");
    const $inputBlogAuthor = container.querySelector("#blog-author");
    const $inputBlogUrl = container.querySelector("#blog-url");
    const $submitButton = screen.getByTestId("submit-button");

    await user.type($inputBlogTitle, NEW_BLOG_TITLE);
    await user.type($inputBlogAuthor, NEW_BLOG_AUTHOR);
    await user.type($inputBlogUrl, NEW_BLOG_URL);
    await user.click($submitButton);

    expect(SUBMIT_FORM.mock.calls).toHaveLength(1);
    expect(SUBMIT_FORM.mock.calls[0][0].title).toBe(NEW_BLOG_TITLE);
    expect(SUBMIT_FORM.mock.calls[0][0].author).toBe(NEW_BLOG_AUTHOR);
    expect(SUBMIT_FORM.mock.calls[0][0].url).toBe(NEW_BLOG_URL);
  });
});
