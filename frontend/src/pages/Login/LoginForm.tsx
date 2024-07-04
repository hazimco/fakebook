import { useState } from "react";
import loginService from "../../services/login";
import useNotification from "../../hooks/useNotification";
import tokenService from "../../services/token";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../../components/ErrorNotification";
import FormInput from "../../components/FormInput";

interface LoginFormProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({ setIsLoggedIn }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useNotification();

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setIsLoggedIn(true);
      tokenService.setToken(user.token);
      localStorage.setItem("logged-in-user", JSON.stringify(user));
      navigate("/");
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
      <FormInput
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        heading="Username"
      />
      <FormInput
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        heading="Password"
      />
      <button className="bg-blue-400 text-white hover:bg-blue-500 active:bg-blue-600 font-semibold rounded-md p-1.5 mt-3">
        Log in
      </button>
      {error && <ErrorNotification message={error} />}
    </form>
  );
};

export default LoginForm;
