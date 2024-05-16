import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Menu from "./components/Menu";
import Profile from "./components/Profile";
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
    tokenService.setToken(null);
    queryClient.clear();
  };

  const loggedInUser = query.data;

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div className=" mt-4 px-3 flex flex-col w-full gap-4">
      <Menu logout={handleLogout} />
      {loggedInUser && (
        <Routes>
          <Route path="/" element={<Profile loggedInUser={loggedInUser} />} />
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
