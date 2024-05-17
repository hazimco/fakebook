import { LinkProps, NavLink } from "react-router-dom";

interface Props {
  logout: () => void;
}

const Menu = ({ logout }: Props) => {
  return (
    <nav className="bg-blue-500 font-medium text-gray-100 rounded-md p-1 flex gap-4 justify-evenly">
      <StyledLink to="/">Profile</StyledLink>
      <StyledLink to="/posts">Posts</StyledLink>
      <StyledLink to="/users">Users</StyledLink>
      <StyledLink to="/" onClick={logout}>
        Log out
      </StyledLink>
    </nav>
  );
};

const StyledLink = (props: LinkProps) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        isActive
          ? "p-1 rounded-md bg-blue-400 hover:bg-blue-300 active:bg-blue-600"
          : "p-1 rounded-md hover:bg-blue-400 active:bg-blue-600"
      }
    >
      {props.children}
    </NavLink>
  );
};

export default Menu;
