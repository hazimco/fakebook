import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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

  useEffect(() => {
    const loggedInUserJson = localStorage.getItem("logged-in-user");
    if (loggedInUserJson) {
      const user = JSON.parse(loggedInUserJson);
      setIsLoggedIn(true);
      tokenService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("logged-in-user");
    setIsLoggedIn(false);
    tokenService.setToken(null);
    queryClient.clear();
  };

  const loggedInUser = query.data;

  return (
    <Routes>
      <Route element={<LoggedOutLayout isLoggedIn={isLoggedIn} />}>
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
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  );
};

export default App;
