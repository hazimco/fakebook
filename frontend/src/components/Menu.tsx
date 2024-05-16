import { Link, LinkProps } from "react-router-dom";

interface Props {
  logout: () => void;
}

const Menu = ({ logout }: Props) => {
  return (
    <div className="bg-blue-500 font-medium text-gray-100 rounded-md p-1 flex gap-4 justify-evenly">
      <StyledLink to="/">Profile</StyledLink>
      <StyledLink to="/posts">Posts</StyledLink>
      <StyledLink to="/users">Users</StyledLink>
      <StyledLink to="/" onClick={logout}>
        Log out
      </StyledLink>
    </div>
  );
};

const StyledLink = (props: LinkProps) => {
  return (
    <Link
      {...props}
      className="p-1 rounded-md hover:bg-blue-400 active:bg-blue-600"
    >
      {props.children}
    </Link>
  );
};

export default Menu;
