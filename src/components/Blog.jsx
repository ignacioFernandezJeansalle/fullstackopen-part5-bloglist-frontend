import PropTypes from "prop-types";
import { useState } from "react";
import "./Blog.css";

const Blog = ({ blog, user, addLike, remove }) => {
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

          {blog.user.id === user.id && (
            <button
              onClick={() => {
                remove(blog.id, blog.title, blog.author);
              }}
              className="remove"
            >
              Remove
            </button>
          )}
        </div>
      )}
    </li>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default Blog;
