export default function FormLogin({ username, setUsername, password, setPassword, handleLogin }) {
  const handleChangeUsername = ({ target }) => setUsername(target.value);
  const handleChangePassword = ({ target }) => setPassword(target.value);

  return (
    <form onSubmit={handleLogin}>
      <h2>Please log in to app</h2>
      <div>
        <label htmlFor="login-username">Username: </label>
        <input id="login-username" type="text" value={username} name="username" onChange={handleChangeUsername} />
      </div>
      <div>
        <label htmlFor="login-password">Password: </label>
        <input id="login-password" type="text" value={password} name="password" onChange={handleChangePassword} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
