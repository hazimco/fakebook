import LoginForm from "./LoginForm";

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setIsLoggedIn }: Props) => {
  return (
    <div className="flex flex-col my-8 gap-6 w-72">
      <h1 className="text-4xl font-semibold text-center">Fakebook</h1>
      <LoginForm setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
};

export default Login;
