import { useState, useEffect, useRef } from "react";
import "./App.css";

import blogService from "./services/blogs";
import loginService from "./services/login";
import FormLogin from "./components/FormLogin";
import FormBlog from "./components/FormBlog";
import Togglable from "./components/Togglable";
import Message from "./components/Message";
import Blog from "./components/Blog";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const formBlogRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogsAppUser");
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON);
      setUser(newUser);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const newUser = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogsAppUser", JSON.stringify(newUser));
      setUser(newUser);
      setUsername("");
      setPassword("");
    } catch (error) {
      handleMessage("Wrong credentials", true);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogsAppUser");
    setUser(null);
  };

  const addNewBlog = async (newBlog) => {
    try {
      const addedBlog = await blogService.create(newBlog, user.token);
      handleMessage(`A new blog: ${addedBlog.title} by ${addedBlog.author}`, false);
      setBlogs(blogs.concat(addedBlog));
      formBlogRef.current.toggleVisibility();
    } catch (error) {
      handleMessage("Error create new blog", true);
    }
  };

  const handleMessage = (message, isError) => {
    setMessage({ message, isError });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const addLike = async (id, currentLikes) => {
    try {
      const likes = { likes: currentLikes + 1 };
      const updatedBlog = await blogService.updateLikes(id, likes, user.token);

      const newBlogs = blogs.map((blog) => {
        if (blog.id === updatedBlog.id) {
          return updatedBlog;
        }

        return blog;
      });

      setBlogs(newBlogs);
    } catch (error) {
      handleMessage("Error update likes", true);
    }
  };

  return (
    <>
      <header>
        <h1>Blogs app</h1>
      </header>

      <main>
        <Message {...message} />
        {user === null ? (
          <FormLogin
            username={username}
            password={password}
            handleChangeUsername={({ target }) => setUsername(target.value)}
            handleChangePassword={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        ) : (
          <>
            <section className="user-info">
              <h2>{user.name}</h2>
              <button onClick={handleLogout}>Logout</button>
            </section>

            <Togglable buttonLabel="Create new blog" ref={formBlogRef}>
              <FormBlog handleSubmit={addNewBlog} />
            </Togglable>

            <section className="list-of-blogs">
              <h2>Blogs</h2>
              <ul>
                {blogs.toReversed().map((blog) => (
                  <Blog key={blog.id} blog={blog} addLike={addLike} />
                ))}
              </ul>
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default App;
