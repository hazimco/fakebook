import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <div className="flex flex-col my-8 gap-6 w-72">
      <div className="flex">
        <Link to="/" className="bg-slate-200 rounded-md px-2 text-slate-600">
          ← Back
        </Link>
      </div>
      <h1 className="text-2xl font-semibold text-center">Create new account</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
