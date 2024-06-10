import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <>
      <div className="flex">
        <Link
          to="/login"
          className="bg-slate-200 rounded-md px-2 text-slate-600"
        >
          ← Back
        </Link>
      </div>
      <h1 className="text-2xl font-semibold text-center">Create new account</h1>
      <SignUpForm />
    </>
  );
};

export default SignUp;
