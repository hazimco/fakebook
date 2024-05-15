import { Link } from "react-router-dom";

interface Props {
  logout: () => void;
}

const Menu = ({ logout }: Props) => {
  return (
    <div className="menu">
      <Link to="/" className="link">
        Profile
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
