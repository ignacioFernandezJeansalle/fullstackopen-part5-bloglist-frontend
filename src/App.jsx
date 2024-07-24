import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import FormLogin from "./components/FormLogin";
import Blog from "./components/Blog";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

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
      console.log("Wrong credentials", error);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogsAppUser");
    setUser(null);
  };

  return (
    <>
      <header>
        <h1>Blogs app</h1>
      </header>

      <main>
        {user === null ? (
          <FormLogin
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        ) : (
          <section>
            <h2>{user.name} logged in</h2>
            <button onClick={handleLogout}>Logout</button>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </section>
        )}
      </main>
    </>
  );
};

export default App;
