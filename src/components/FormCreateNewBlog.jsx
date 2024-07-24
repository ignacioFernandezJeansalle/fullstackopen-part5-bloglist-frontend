export default function FormCreateNewBlog({ newBlog, setNewBlog, handleCreateNewBlog }) {
  const KEY_TITLE = "title";
  const KEY_AUTHOR = "author";
  const KEY_URL = "url";

  const handleChangeNewBlog = () => {
    const $form = document.getElementById("form-new-blog");
    const formData = new FormData($form);

    setNewBlog({
      title: formData.get(KEY_TITLE),
      author: formData.get(KEY_AUTHOR),
      url: formData.get(KEY_URL),
    });
  };

  return (
    <form id="form-new-blog" onSubmit={handleCreateNewBlog}>
      <h2>Create new blog</h2>
      <div>
        <label htmlFor="new-blog-title">Title: </label>
        <input id="new-blog-title" type="text" value={newBlog.title} name={KEY_TITLE} onChange={handleChangeNewBlog} />
      </div>
      <div>
        <label htmlFor="new-blog-author">Author: </label>
        <input
          id="new-blog-author"
          type="text"
          value={newBlog.author}
          name={KEY_AUTHOR}
          onChange={handleChangeNewBlog}
        />
      </div>
      <div>
        <label htmlFor="new-blog-url">url: </label>
        <input id="new-blog-url" type="text" value={newBlog.url} name={KEY_URL} onChange={handleChangeNewBlog} />
      </div>

      <button type="submit">Create</button>
    </form>
  );
}
