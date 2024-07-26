import { useQueryClient } from "@tanstack/react-query";
import postsService from "../services/posts";
import useMutationWithNotificationOnError from "./useMutationWithNotificationOnError";
import { Post } from "../types/types";

interface Props {
  closeForm: () => void;
}

const useCreatePost = ({ closeForm }: Props) => {
  const queryClient = useQueryClient();

  return useMutationWithNotificationOnError({
    mutationFn: postsService.createNew,
    onSuccess: (newPost) => {
      const posts = queryClient.getQueryData<Post[]>(["posts"]) || [];
      queryClient.setQueryData(["posts"], [...posts, newPost]);

      closeForm();
    },
  });
};

export default useCreatePost;
