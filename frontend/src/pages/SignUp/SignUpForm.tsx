import { useState } from "react";

const StyledInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className="border-gray-400 border rounded-md py-1.5 px-2 bg-gray-100"
    />
  );
};

const initialFormState = {
  username: "",
  password: "",
  repeatPassword: "",
};

const SignUpForm = () => {
  const [form, setForm] = useState(initialFormState);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex flex-col">
        <h2>Username</h2>
        <StyledInput
          name="username"
          value={form.username}
          onChange={handleFormChange}
        />
      </div>
      <div className="flex flex-col">
        <h2>Password</h2>
        <StyledInput
          name="password"
          type="password"
          value={form.password}
          onChange={handleFormChange}
        />
      </div>
      <div className="flex flex-col">
        <h2>Repeat Password</h2>
        <StyledInput
          name="repeatPassword"
          type="password"
          value={form.repeatPassword}
          onChange={handleFormChange}
        />
      </div>
      <button className="bg-blue-400 text-white hover:bg-blue-500 active:bg-blue-600 font-semibold rounded-md p-1.5 mt-3">
        Sign up
      </button>
    </form>
  );
};

export default SignUpForm;
