import { useState } from "react";
import loginService from "../services/login";
import useNotification from "../hooks/useNotification";
import tokenService from "../services/token";

const ErrorNotification = ({ message }) => {
  return <div className="error">{message}</div>;
};

const LoginForm = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useNotification();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setLoggedInUser(user);
      tokenService.setToken(user.token);
    } catch (error) {
      setError(error?.response?.data?.error || error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="input-container">
        Username:{" "}
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className="input-container">
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button>Log in</button>
      {error && <ErrorNotification message={error} />}
    </form>
  );
};

export default LoginForm;
