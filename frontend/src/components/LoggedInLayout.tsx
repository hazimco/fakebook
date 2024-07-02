import { Navigate, Outlet, useLocation } from "react-router-dom";
import Menu from "./Menu";

interface Props {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const LoggedInLayout = ({ isLoggedIn, handleLogout }: Props) => {
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return (
    <div className="px-3 flex flex-col w-full gap-4">
      <Menu logout={handleLogout} />
      <Outlet />
    </div>
  );
};

export default LoggedInLayout;
