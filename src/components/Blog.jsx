import { useState } from "react";
import "./Blog.css";

export default function Blog({ blog, addLike }) {
  const [visible, setVisible] = useState(false);

  return (
    <li className="bloglist-item">
      <div className="title">
        <p>
          <b>{blog.title}</b>
        </p>
        <button onClick={() => setVisible(!visible)}>{visible ? "Hide" : "View"}</button>
      </div>

      {visible && (
        <div className="content">
          <p>
            <i>link:</i> {blog.url}
          </p>
          <span>
            <p>
              <i>likes:</i> {blog.likes}
            </p>
            <button onClick={() => addLike(blog.id, blog.likes)}>Like</button>
          </span>
          <p>
            <i>author:</i> {blog.author}
          </p>
          <p>
            <i>user:</i> {blog.user.name}
          </p>
        </div>
      )}
    </li>
  );
}
