import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import tokenService from "./services/token";
import usersService from "./services/users";
import SignUp from "./pages/SignUp";
import LoggedInLayout from "./components/LoggedInLayout";
import LoggedOutLayout from "./components/LoggedOutLayout";

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

  return (
    <Routes>
      <Route element={<LoggedOutLayout />}>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
      <Route
        element={
          <LoggedInLayout isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        }
      >
        <Route path="/" element={<Profile loggedInUser={loggedInUser} />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/users" element={<Users loggedInUser={loggedInUser} />} />
      </Route>
    </Routes>
  );
};

export default App;
