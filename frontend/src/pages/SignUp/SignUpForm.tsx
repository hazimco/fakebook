import { useReducer } from "react";
import { useMutation } from "@tanstack/react-query";
import usersService from "../../services/users";
import useNotification from "../../hooks/useNotification";
import axios from "axios";

type FormReducerAction =
  | { type: "inputTouched"; payload: { name: string } }
  | { type: "inputChange"; payload: { name: string; value: string } };

const formReducer = (state: FormState, action: FormReducerAction) => {
  switch (action.type) {
    case "inputTouched": {
      const { name } = action.payload;
      return {
        ...state,
        [name]: {
          ...state[name as keyof FormState],
          touched: true,
        },
      };
    }
    case "inputChange": {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: {
          ...state[name as keyof FormState],
          value,
        },
      };
    }
    default:
      return state;
  }
};

interface ErrorNotificationProps {
  message: string;
}

const ErrorNotification = ({ message }: ErrorNotificationProps) => {
  return <div className="text-red-500 text-center">{message}</div>;
};

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

interface InputObject {
  value: string;
  touched: boolean;
}
interface FormState {
  username: InputObject;
  password: InputObject;
  repeatPassword: InputObject;
}

const initialFormState: FormState = {
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
  const [form, dispatch] = useReducer(formReducer, initialFormState);

  const [error, setError] = useNotification();

  const createUserMutation = useMutation({
    mutationFn: usersService.create,
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error) => {
      //this could happen if e.g. backend does not work, or if validation in client is incorrect or incomplete
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error || error.message);
      } else {
        setError("Unknown error: " + error);
      }
    },
  });

  const validation = {
    username: {
      isValid: (value: string) => value.length >= 3 && value.length <= 20,
      message: "Username must be 3-20 characters long",
    },
    password: {
      isValid: (value: string) => value.length >= 3,
      message: "Password must be at least 3 characters long",
    },
    repeatPassword: {
      isValid: (value: string) => value === form.password.value,
      message: "Passwords do not match",
    },
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch({ type: "inputChange", payload: { name, value } });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createUserMutation.mutate({
      username: form.username.value,
      password: form.password.value,
    });
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    dispatch({ type: "inputTouched", payload: { name } });
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
        errorMessage={form.username.touched ? errors.username : ""}
        onBlur={handleBlur}
      />
      <FormInput
        name="password"
        type="password"
        value={form.password.value}
        onChange={handleFormChange}
        heading="Password"
        errorMessage={form.password.touched ? errors.password : ""}
        onBlur={handleBlur}
      />
      <FormInput
        name="repeatPassword"
        type="password"
        value={form.repeatPassword.value}
        onChange={handleFormChange}
        heading="Repeat Password"
        errorMessage={form.repeatPassword.value ? errors.repeatPassword : ""}
        onBlur={handleBlur}
      />
      <button
        disabled={Object.values(errors).some((value) => value !== "")}
        className="bg-blue-400 text-white hover:bg-blue-500 active:bg-blue-600 font-semibold rounded-md p-1.5 mt-3 disabled:bg-slate-200 disabled:text-slate-400"
      >
        Sign up
      </button>
      {error && <ErrorNotification message={error} />}
    </form>
  );
};

export default SignUpForm;
