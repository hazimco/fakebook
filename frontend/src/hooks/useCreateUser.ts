import usersService from "../services/users";
import useMutationWithNotificationOnError from "./useMutationWithNotificationOnError";

const useCreateUser = () => {
  return useMutationWithNotificationOnError({
    mutationFn: usersService.create,
    onSuccess: (response) => {
      console.log(response);
    },
  });
};

export default useCreateUser;
