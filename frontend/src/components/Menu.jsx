import { Link } from "react-router-dom";

const Menu = ({ logout }) => {
  return (
    <div className="menu">
      <Link to="/" className="link">
        Home
      </Link>
      <Link to="/posts" className="link">
        Posts
      </Link>
      <Link to="/users" className="link">
        Users
      </Link>
      <Link to="/" className="link" onClick={logout}>
        Log out
      </Link>
    </div>
  );
};

export default Menu;
