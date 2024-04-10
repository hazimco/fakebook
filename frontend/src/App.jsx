import { useState } from "react";

import LoginForm from "./components/LoginForm";

const App = () => {
  const [user, setUser] = useState();

  if (!user)
    return (
      <div>
        <h1>Fakebook</h1>
        <LoginForm setUser={setUser} />
      </div>
    );

  return <>hello {user.username}</>;
};

export default App;
