export default function FormLogin({ username, password, handleChangeUsername, handleChangePassword, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="login-username">Username: </label>
        <input id="login-username" type="text" value={username} name="username" onChange={handleChangeUsername} />
      </div>
      <div>
        <label htmlFor="login-password">Password: </label>
        <input id="login-password" type="password" value={password} name="password" onChange={handleChangePassword} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
