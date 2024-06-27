import { Navigate, Outlet } from "react-router-dom";

interface Props {
  isLoggedIn: boolean;
}

const LoggedOutLayout = ({ isLoggedIn }: Props) => {
  if (isLoggedIn) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="flex flex-col my-8 gap-6 w-72">
      <Outlet />
    </div>
  );
};

export default LoggedOutLayout;
