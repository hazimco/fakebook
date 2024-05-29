import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Menu from "./components/Menu";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import tokenService from "./services/token";
import usersService from "./services/users";
import SignUp from "./pages/SignUp";

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
    return (
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    );
  }

  return (
    <div className="mt-4 px-3 flex flex-col w-full gap-4">
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
