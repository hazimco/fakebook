import { useQueryClient } from "@tanstack/react-query";
import usersService from "../services/users";
import useMutationWithNotificationOnError from "./useMutationWithNotificationOnError";
import { User } from "../types/types";

const useEditDescription = () => {
  const queryClient = useQueryClient();

  return useMutationWithNotificationOnError({
    mutationFn: usersService.editDescription,
    onSuccess: (response) => {
      const user = queryClient.getQueryData<User>(["loggedInUser"]);
      queryClient.setQueryData(["loggedInUser"], {
        ...user,
        description: response.description,
      });
    },
  });
};

export default useEditDescription;
