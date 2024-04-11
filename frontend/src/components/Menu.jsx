import { Link } from "react-router-dom";

const Menu = ({ logout }) => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/users">Users</Link>
      <Link to="/" onClick={logout}>
        Log out
      </Link>
    </div>
  );
};

export default Menu;
