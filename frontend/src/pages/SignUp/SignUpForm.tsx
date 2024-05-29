import { useState } from "react";

const StyledInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className="border-gray-400 border rounded-md py-1.5 px-2 bg-gray-100"
    />
  );
};

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
      <div className="flex flex-col">
        <h2>Repeat Password</h2>
        <StyledInput
          type="password"
          value={repeatPassword}
          onChange={(event) => setRepeatPassword(event.target.value)}
        />
      </div>
      <button className="bg-blue-400 text-white hover:bg-blue-500 active:bg-blue-600 font-semibold rounded-md p-1.5 mt-3">
        Sign up
      </button>
    </form>
  );
};

export default SignUpForm;
