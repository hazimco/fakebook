import LoginForm from "./LoginForm";

const Login = ({ setIsLoggedIn }) => {
  return (
    <div className="login">
      <h1>Fakebook</h1>
      <LoginForm setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
};

export default Login;
