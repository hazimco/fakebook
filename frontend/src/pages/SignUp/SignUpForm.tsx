import { useState } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  heading: string;
}

const FormInput = ({ heading, ...props }: FormInputProps) => {
  return (
    <div className="flex flex-col">
      <h2>{heading}</h2>
      <input
        {...props}
        className="border-gray-400 border rounded-md py-1.5 px-2 bg-gray-100"
      />
    </div>
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
      <FormInput
        name="username"
        value={form.username}
        onChange={handleFormChange}
        heading="Username"
      />
      <FormInput
        name="password"
        type="password"
        value={form.password}
        onChange={handleFormChange}
        heading="Password"
      />
      <FormInput
        name="repeatPassword"
        type="password"
        value={form.repeatPassword}
        onChange={handleFormChange}
        heading="Repeat Password"
      />
      <button className="bg-blue-400 text-white hover:bg-blue-500 active:bg-blue-600 font-semibold rounded-md p-1.5 mt-3">
        Sign up
      </button>
    </form>
  );
};

export default SignUpForm;
