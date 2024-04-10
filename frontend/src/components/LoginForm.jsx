import { useState } from "react";
import loginService from "../services/login";
import useNotification from "../hooks/useNotification";

const ErrorNotification = ({ message }) => {
  return <div>{message}</div>;
};

const LoginForm = ({ setUser }) => {
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
      setUser(user);
    } catch (error) {
      setError(error?.response?.data?.error || error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username:{" "}
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button>Log in</button>
      </form>
      {error && <ErrorNotification message={error} />}
    </div>
  );
};

export default LoginForm;
