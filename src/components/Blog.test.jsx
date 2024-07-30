import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  const SELECTOR_TITLE = ".title";
  const SELECTOR_CONTENT = ".content";

  const BLOG = {
    title: "Blog title".toUpperCase(),
    author: "Blog author",
    url: "Blog url",
    likes: 8,
  };

  const USER = {
    id: "6695284bd188ca441201f47e",
    name: "Ignacio Fernández Jeansalle",
    username: "admin",
    /* token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2Njk1Mjg0YmQxODhjYTQ0MTIwMWY0N2UiLCJpYXQiOjE3MjIyNjQzOTF9.ICKiuv9sB0ou5lAuVK7pU30WYaBi_T7O1B44iE9pdFc", */
  };

  const ADD_LIKE = vi.fn();
  const REMOVE = vi.fn();

  test("at start render title and author, not url and likes", () => {
    const { container } = render(<Blog blog={BLOG} user={USER} addLike={ADD_LIKE} remove={REMOVE} />);

    const $title = container.querySelector(SELECTOR_TITLE);
    expect($title).toBeDefined();
    expect($title).toHaveTextContent(BLOG.title);
    expect($title).toHaveTextContent(BLOG.author);

    const $content = container.querySelector(SELECTOR_CONTENT);
    expect($content).toBeNull();
  });
});
