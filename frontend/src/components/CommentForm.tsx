import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import postsService from "../services/posts";
import { Comment, Post } from "../types/types";

interface Props {
  postId: string;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentForm = ({ postId, setShowForm }: Props) => {
  const [text, setText] = useState("");

  const queryClient = useQueryClient();

  const closeForm = () => {
    setShowForm(false);
    setText("");
  };

  const addCommentMutation = useMutation({
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addCommentMutation.mutate({ text, id: postId });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Comment..."
        maxLength={140}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <div>
        <button>Done</button>
        <button onClick={closeForm}>Cancel</button>
        {140 - text.length} characters left
      </div>
    </form>
  );
};

export default CommentForm;
