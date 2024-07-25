import { useState } from "react";
import "./Blog.css";

export default function Blog({ blog }) {
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
          <p>{blog.url}</p>
          <span>
            <p>likes: {blog.likes}</p>
            <button>Like</button>
          </span>

          <p>{blog.author}</p>
        </div>
      )}
    </li>
  );
}
