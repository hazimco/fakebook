import { useState } from "react";

import LoginForm from "./components/LoginForm";

const App = () => {
  const [user, setUser] = useState();

  if (!user) return <LoginForm setUser={setUser} />;

  return <>hello {user.username}</>;
};

export default App;
