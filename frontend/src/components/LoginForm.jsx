import { useState } from "react";
import loginService from "../services/login";

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const user = await loginService.login({
      username,
      password,
    });

    setUser(user);
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
    </div>
  );
};

export default LoginForm;
