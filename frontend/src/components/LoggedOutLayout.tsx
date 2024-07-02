import { Location, Navigate, Outlet, useLocation } from "react-router-dom";

interface Props {
  isLoggedIn: boolean;
}

interface LocationState {
  from?: Location;
}

const LoggedOutLayout = ({ isLoggedIn }: Props) => {
  const location: Location<LocationState | undefined> = useLocation();

  if (isLoggedIn) {
    return <Navigate to={location.state?.from?.pathname || "/"} replace />;
  }

  return (
    <div className="flex flex-col my-8 gap-6 w-72">
      <Outlet />
    </div>
  );
};

export default LoggedOutLayout;
