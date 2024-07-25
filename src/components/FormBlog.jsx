import { useState } from "react";

export default function FormBlog({ handleSubmit }) {
  const EMPTY_BLOG = { title: "", author: "", url: "" };
  const KEY_TITLE = "title";
  const KEY_AUTHOR = "author";
  const KEY_URL = "url";

  const [blog, setBlog] = useState(EMPTY_BLOG);

  const handleChangeData = () => {
    const $form = document.getElementById("form-blog");
    const $formData = new FormData($form);

    setBlog({
      title: $formData.get(KEY_TITLE),
      author: $formData.get(KEY_AUTHOR),
      url: $formData.get(KEY_URL),
    });
  };

  const createBlog = (event) => {
    event.preventDefault();

    handleSubmit(blog);
    setBlog(EMPTY_BLOG);
  };

  return (
    <form id="form-blog" onSubmit={createBlog}>
      <h2>Create new blog</h2>
      <div>
        <label htmlFor="blog-title">Title: </label>
        <input id="blog-title" type="text" value={blog.title} name={KEY_TITLE} onChange={handleChangeData} />
      </div>
      <div>
        <label htmlFor="blog-author">Author: </label>
        <input id="blog-author" type="text" value={blog.author} name={KEY_AUTHOR} onChange={handleChangeData} />
      </div>
      <div>
        <label htmlFor="blog-url">url: </label>
        <input id="blog-url" type="text" value={blog.url} name={KEY_URL} onChange={handleChangeData} />
      </div>

      <button type="submit">Create</button>
    </form>
  );
}
