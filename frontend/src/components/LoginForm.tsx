import { useState } from "react";
import loginService from "../services/login";
import useNotification from "../hooks/useNotification";
import tokenService from "../services/token";
import axios from "axios";

interface ErrorNotificationProps {
  message: string;
}

const ErrorNotification = ({ message }: ErrorNotificationProps) => {
  return <div className="text-red-500 text-center">{message}</div>;
};

const StyledInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className="border-gray-400 border rounded-md py-1.5 px-2 bg-gray-100"
    />
  );
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
    <form onSubmit={handleLogin} className="flex flex-col gap-2">
      <div className="flex flex-col">
        <h2>Username</h2>
        <StyledInput
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <h2>Password</h2>
        <StyledInput
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button className="bg-blue-400 text-white hover:bg-blue-500 active:bg-blue-600 active:bg- font-semibold rounded-md p-1.5 mt-3">
        Log in
      </button>
      {error && <ErrorNotification message={error} />}
    </form>
  );
};

export default LoginForm;
