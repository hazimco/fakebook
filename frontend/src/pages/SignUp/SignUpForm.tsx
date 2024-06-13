import { useState } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  heading: string;
  errorMessage: string;
}

const FormInput = ({ heading, errorMessage, ...props }: FormInputProps) => {
  return (
    <div className="flex flex-col">
      <h2>{heading}</h2>
      <input
        {...props}
        className="border-gray-400 border rounded-md py-1.5 px-2 bg-gray-100"
      />
      <div className="text-red-600">{errorMessage}</div>
    </div>
  );
};

const initialFormState = {
  username: {
    value: "",
    touched: false,
  },
  password: {
    value: "",
    touched: false,
  },
  repeatPassword: {
    value: "",
    touched: false,
  },
};

const SignUpForm = () => {
  const [form, setForm] = useState(initialFormState);

  const validation = {
    username: {
      isValid: (value: string) => !!value,
      message: "Username is required",
    },
    password: {
      isValid: (value: string) => !!value,
      message: "Password is required",
    },
    repeatPassword: {
      isValid: (value: string) => value === form.password.value,
      message: "Passwords do not match",
    },
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: {
        ...form[name as keyof typeof form],
        value,
      },
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const errors = Object.keys(form).reduce((result, key) => {
    if (!(key in validation)) return result;

    const keyWithNarrowedType = key as keyof typeof validation; //manually narrowing type of key since accessing validation[key] gives error

    const message = !validation[keyWithNarrowedType].isValid(
      form[keyWithNarrowedType].value
    )
      ? validation[keyWithNarrowedType].message
      : "";

    return { ...result, [key]: message };
  }, {} as Record<keyof typeof validation, string>); //const errors: Record<"username" | "password" | "repeatPassword", string>

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <FormInput
        name="username"
        value={form.username.value}
        onChange={handleFormChange}
        heading="Username"
        errorMessage={errors.username}
      />
      <FormInput
        name="password"
        type="password"
        value={form.password.value}
        onChange={handleFormChange}
        heading="Password"
        errorMessage={errors.password}
      />
      <FormInput
        name="repeatPassword"
        type="password"
        value={form.repeatPassword.value}
        onChange={handleFormChange}
        heading="Repeat Password"
        errorMessage={errors.repeatPassword}
      />
      <button className="bg-blue-400 text-white hover:bg-blue-500 active:bg-blue-600 font-semibold rounded-md p-1.5 mt-3">
        Sign up
      </button>
    </form>
  );
};

export default SignUpForm;
