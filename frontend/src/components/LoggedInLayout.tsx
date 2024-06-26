import { Navigate, Outlet } from "react-router-dom";
import Menu from "./Menu";

interface Props {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const LoggedInLayout = ({ isLoggedIn, handleLogout }: Props) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="px-3 flex flex-col w-full gap-4">
      <Menu logout={handleLogout} />
      <Outlet />
    </div>
  );
};

export default LoggedInLayout;
