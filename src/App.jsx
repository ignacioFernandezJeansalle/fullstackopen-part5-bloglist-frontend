import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import FormLogin from "./components/FormLogin";
import FormCreateNewBlog from "./components/FormCreateNewBlog";
import Message from "./components/Message";
import Blog from "./components/Blog";

const EMPTY_BLOG = { title: "", author: "", url: "" };

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState(EMPTY_BLOG);
  const [message, setMessage] = useState(null);

  const getAndSetBlogs = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  useEffect(() => {
    getAndSetBlogs();
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

  const handleCreateNewBlog = async (event) => {
    event.preventDefault();

    try {
      const response = await blogService.create(newBlog, user.token);
      handleMessage(`A new blog: ${response.title} by ${response.author}`, false);
      setNewBlog(EMPTY_BLOG);
      getAndSetBlogs();
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
            <section>
              <h2>{user.name} logged in</h2>
              <button onClick={handleLogout}>Logout</button>
            </section>

            <FormCreateNewBlog newBlog={newBlog} setNewBlog={setNewBlog} handleCreateNewBlog={handleCreateNewBlog} />

            <section>
              <h2>Blogs:</h2>
              {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default App;
