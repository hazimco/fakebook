import { Link, LinkProps, NavLink } from "react-router-dom";

interface Props {
  logout: () => void;
}

const Menu = ({ logout }: Props) => {
  // z-10 added to menu container since using "scale-110" on UserCircleIcon (or any component) leads to the component ending up in front of the menu.
  // Reason according to GPT: "When you apply a CSS transform (like scale) to an element, it creates a new stacking context. This means that the transformed element and its descendants are rendered in a different layer than the elements that are not transformed."
  return (
    <div className="bg-slate-50 rounded-b-md pt-4 sticky top-0 z-10">
      <nav className="bg-blue-500 font-medium text-gray-100 rounded-md p-1 flex gap-4 justify-evenly">
        <StyledNavLink to="/">Profile</StyledNavLink>
        <StyledNavLink to="/posts">Posts</StyledNavLink>
        <StyledNavLink to="/users">Users</StyledNavLink>
        <Link
          to="/"
          onClick={logout}
          className="p-1 rounded-md hover:bg-blue-400 active:bg-blue-600"
        >
          Log out
        </Link>
      </nav>
    </div>
  );
};

const StyledNavLink = (props: LinkProps) => {
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
