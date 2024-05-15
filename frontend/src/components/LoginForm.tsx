import { useState } from "react";
import loginService from "../services/login";
import useNotification from "../hooks/useNotification";
import tokenService from "../services/token";
import axios from "axios";

interface ErrorNotificationProps {
  message: string;
}

const ErrorNotification = ({ message }: ErrorNotificationProps) => {
  return <div className="error">{message}</div>;
};

interface LoginFormProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({ setIsLoggedIn }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useNotification();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setIsLoggedIn(true);
      tokenService.setToken(user.token);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error || error.message);
      } else {
        setError("Unknown error: " + error);
      }
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
