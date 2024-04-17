import LoginForm from "./LoginForm";

const Login = ({ setLoggedInUser }) => {
  return (
    <div className="login">
      <h1>Fakebook</h1>
      <LoginForm setLoggedInUser={setLoggedInUser} />
    </div>
  );
};

export default Login;
