import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Users from "./components/Users";
import tokenService from "./services/token";
import Login from "./components/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    tokenService.setToken();
  };

  if (!isLoggedIn) {
    return (
      <div className="app">
        <Login setIsLoggedIn={setIsLoggedIn} />
      </div>
    );
  }

  const loggedInUser = {}; //temporary - so that app doesn't crashgit

  return (
    <div className="app">
      <Menu logout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={<Home loggedInUsername={loggedInUser.username} />}
        />
        <Route path="/posts" element={<Posts />} />
        <Route
          path="/users"
          element={<Users loggedInUsername={loggedInUser.username} />}
        />
      </Routes>
    </div>
  );
};

export default App;
