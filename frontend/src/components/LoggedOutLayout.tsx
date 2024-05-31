import { Outlet } from "react-router-dom";

const LoggedOutLayout = () => {
  /** todo: Navigate to "/" if trying to access "/login" or "/sign-up" when already logged in.
   * Currenty not needed since entering a specific path in the browser
   * will reload the app and the user will be logged out automatically */

  return (
    <div className="flex flex-col my-8 gap-6 w-72">
      <Outlet />
    </div>
  );
};

export default LoggedOutLayout;
