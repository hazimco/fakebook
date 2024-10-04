import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import SignUp from "./pages/SignUp";
import LoggedInLayout from "./components/LoggedInLayout";
import LoggedOutLayout from "./components/LoggedOutLayout";

import tokenService from "./services/token";
import useGetLoggedInUser from "./hooks/useGetLoggedInUser";
import PageTitle from "./components/PageTitle";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const queryClient = useQueryClient();

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

  const { loggedInUser, refetch } = useGetLoggedInUser(
    isLoggedIn,
    handleLogout
  );
  return (
    <Routes>
      <Route
        element={
          <>
            <PageTitle />
            <LoggedOutLayout isLoggedIn={isLoggedIn} />
          </>
        }
      >
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
      <Route
        element={
          <>
            <PageTitle />
            <LoggedInLayout
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
            />
          </>
        }
      >
        <Route
          path="/"
          element={
            <Profile
              loggedInUser={loggedInUser}
              refetchLoggedInUser={refetch}
            />
          }
        />
        <Route path="/posts" element={<Posts />} />
        <Route path="/users" element={<Users loggedInUser={loggedInUser} />} />
      </Route>
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  );
};

export default App;
