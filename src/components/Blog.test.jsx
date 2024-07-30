import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  const SELECTOR_TITLE = ".title";
  const SELECTOR_CONTENT = ".content";

  const BLOG = {
    title: "Blog title".toUpperCase(),
    author: "Blog author",
    url: "Blog url",
    likes: 8,
    user: {
      id: "6695284bd188ca441201f47e",
      name: "Ignacio Fernández Jeansalle",
      username: "admin",
    },
  };

  const USER = {
    id: "6695284bd188ca441201f47e",
    name: "Ignacio Fernández Jeansalle",
    username: "admin",
  };

  const ADD_LIKE = vi.fn();
  const REMOVE = vi.fn();

  let container;
  beforeEach(() => {
    container = render(<Blog blog={BLOG} user={USER} addLike={ADD_LIKE} remove={REMOVE} />).container;
  });

  test("at start render title and author, not url and likes", () => {
    const $title = container.querySelector(SELECTOR_TITLE);
    expect($title).toBeDefined();
    expect($title).toHaveTextContent(BLOG.title);
    expect($title).toHaveTextContent(BLOG.author);

    const $content = container.querySelector(SELECTOR_CONTENT);
    expect($content).toBeNull();
  });

  test("clicking the button view, render url and likes", async () => {
    const user = userEvent.setup();

    const $viewButton = screen.getByTestId("view-button");
    await user.click($viewButton);

    const $content = container.querySelector(SELECTOR_CONTENT);
    expect($content).toBeDefined();
    expect($content).toHaveTextContent(BLOG.url);
    expect($content).toHaveTextContent(BLOG.likes);
  });

  test("clicking twice on the like button calls event handler twice", async () => {
    const user = userEvent.setup();

    const $viewButton = screen.getByTestId("view-button");
    await user.click($viewButton);

    const $likeButton = screen.getByTestId("like-button");
    await user.click($likeButton);
    await user.click($likeButton);
    expect(ADD_LIKE.mock.calls).toHaveLength(2);
  });

  test("clicking the button remove call event handler", async () => {
    const user = userEvent.setup();

    const $viewButton = screen.getByTestId("view-button");
    await user.click($viewButton);

    const $removeButton = screen.getByTestId("remove-button");
    await user.click($removeButton);

    expect(REMOVE.mock.calls).toHaveLength(1);
  });
});
