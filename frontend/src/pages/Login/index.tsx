import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setIsLoggedIn }: Props) => {
  return (
    <>
      <h1 className="text-4xl font-semibold text-center">Fakebook</h1>
      <LoginForm setIsLoggedIn={setIsLoggedIn} />
      <CreateAccountLink />
    </>
  );
};

const CreateAccountLink = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center justify-evenly w-full">
        <Line />
        <div className="text-slate-500 font-semibold">OR</div>
        <Line />
      </div>
      <Link to="/sign-up" className="text-blue-400 font-semibold">
        Create a new account
      </Link>
    </div>
  );
};

const Line = () => {
  return <div className="bg-slate-300 w-1/3 h-px"></div>;
};

export default Login;
