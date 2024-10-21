import usersService from "../services/users";
import { IRefetchLoggedInUser } from "../types/types";
import useMutationWithNotificationOnError from "./useMutationWithNotificationOnError";

interface Props {
  refetchLoggedInUser: IRefetchLoggedInUser;
}

const useUploadProfileImage = ({ refetchLoggedInUser }: Props) => {
  return useMutationWithNotificationOnError({
    mutationFn: usersService.uploadProfileImage,
    onSuccess: (response) => {
      console.log(response);
      refetchLoggedInUser();
    },
  });
};

export default useUploadProfileImage;
