import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Users from "./components/Users";
import postsService from "./services/posts";
import Login from "./components/Login";

const App = () => {
  const [user, setUser] = useState();

  const handleLogout = () => {
    setUser();
    postsService.setToken(null);
  };

  if (!user) {
    return (
      <div className="app">
        <Login setUser={setUser} />
      </div>
    );
  }

  return (
    <div className="app">
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
