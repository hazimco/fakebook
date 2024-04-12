import LoginForm from "./LoginForm";

const Login = ({ setUser }) => {
  return (
    <div className="login">
      <h1>Fakebook</h1>
      <LoginForm setUser={setUser} />
    </div>
  );
};

export default Login;
