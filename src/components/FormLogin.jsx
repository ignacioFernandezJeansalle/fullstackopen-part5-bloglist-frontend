import PropTypes from "prop-types";

const FormLogin = ({ username, password, handleChangeUsername, handleChangePassword, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="login-username">Username: </label>
        <input
          data-testid="username"
          id="login-username"
          type="text"
          value={username}
          name="username"
          onChange={handleChangeUsername}
        />
      </div>
      <div>
        <label htmlFor="login-password">Password: </label>
        <input
          data-testid="password"
          id="login-password"
          type="password"
          value={password}
          name="password"
          onChange={handleChangePassword}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

FormLogin.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleChangeUsername: PropTypes.func.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default FormLogin;
