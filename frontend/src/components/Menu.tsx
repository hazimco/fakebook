import { Link } from "react-router-dom";

interface Props {
  logout: () => void;
}

const Menu = ({ logout }: Props) => {
  return (
    <div>
      <Link to="/">Profile</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/users">Users</Link>
      <Link to="/" onClick={logout}>
        Log out
      </Link>
    </div>
  );
};

export default Menu;
