import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import usersService from "../services/users";
import axios from "axios";

const useGetLoggedInUser = (isLoggedIn: boolean, handleLogout: () => void) => {
  const { data, error } = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: usersService.getLoggedInUser,
    enabled: isLoggedIn,
    retry: false, // to fail fast - otherwise, if reloading page, it takes a while before login page is displayed
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (
      axios.isAxiosError(error) &&
      error.response?.data.error === "jwt expired"
    ) {
      handleLogout();
    }
  }, [handleLogout, error]);

  return { loggedInUser: data };
};

export default useGetLoggedInUser;
