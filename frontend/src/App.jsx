import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Menu from "./components/Menu";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Users from "./components/Users";
import tokenService from "./services/token";
import Login from "./components/Login";
import usersService from "./services/users";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: usersService.getLoggedInUser,
    enabled: isLoggedIn,
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
    tokenService.setToken();
    queryClient.clear();
  };

  const loggedInUser = query.data;

  if (!isLoggedIn) {
    return (
      <div className="app">
        <Login setIsLoggedIn={setIsLoggedIn} />
      </div>
    );
  }

  return (
    <div className="app">
      <Menu logout={handleLogout} />
      {loggedInUser && (
        <Routes>
          <Route
            path="/"
            element={<Home loggedInUsername={loggedInUser.username} />}
          />
          <Route path="/posts" element={<Posts />} />
          <Route
            path="/users"
            element={<Users loggedInUser={loggedInUser} />}
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
