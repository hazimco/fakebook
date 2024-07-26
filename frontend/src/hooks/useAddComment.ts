import { useQueryClient } from "@tanstack/react-query";
import postsService from "../services/posts";
import useMutationWithNotificationOnError from "./useMutationWithNotificationOnError";
import { Post } from "../types/types";

interface Props {
  postId: string;
  closeForm: () => void;
}

const useAddComment = ({ postId, closeForm }: Props) => {
  const queryClient = useQueryClient();

  return useMutationWithNotificationOnError({
    mutationFn: postsService.addComment,
    onSuccess: (newComment) => {
      const comments = queryClient.getQueryData<Comment[]>([
        "post-comments",
        postId,
      ]);
      if (comments) {
        queryClient.setQueryData(
          ["post-comments", postId],
          [...comments, newComment]
        );
      } else {
        //updating "posts" query so the "show comments" button is displayed for the post
        const posts = queryClient.getQueryData<Post[]>(["posts"]) || []; // "|| []" is to silence typescript - logically, if you have just added a comment to a post, then there needs to be at least one post returned by getQueryData
        const updatedPosts = posts.map((post) =>
          post.id !== postId
            ? post
            : { ...post, comments: [...post.comments, newComment] }
        );
        queryClient.setQueryData(["posts"], updatedPosts);
      }

      closeForm();
    },
  });
};

export default useAddComment;
