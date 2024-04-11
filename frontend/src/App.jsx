import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Menu from "./components/Menu";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Users from "./components/Users";
import postsService from "./services/posts";

const App = () => {
  const [user, setUser] = useState();

  const handleLogout = () => {
    setUser();
    postsService.setToken(null);
  };

  if (!user)
    return (
      <div>
        <h1>Fakebook</h1>
        <LoginForm setUser={setUser} />
      </div>
    );

  return (
    <div>
      <Menu logout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home username={user.username} />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
};

export default App;
