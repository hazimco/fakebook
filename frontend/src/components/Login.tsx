import LoginForm from "./LoginForm";

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setIsLoggedIn }: Props) => {
  return (
    <div className="login">
      <h1>Fakebook</h1>
      <LoginForm setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
};

export default Login;
