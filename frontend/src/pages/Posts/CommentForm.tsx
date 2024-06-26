import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import postsService from "../../services/posts";
import { Comment, Post } from "../../types/types";

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
    <form
      onSubmit={handleSubmit}
      className="text-sm flex-1 mr-2 flex flex-col gap-1"
    >
      <input
        placeholder="Comment..."
        maxLength={140}
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="py-1.5 px-2 border-blue-400 border rounded-md"
      />
      <div>{140 - text.length} characters left</div>
      <div className="flex gap-2">
        <button className="bg-green-300 hover:bg-green-200 active:bg-green-400 py-1 px-3 rounded-md">
          Done
        </button>
        <button
          onClick={closeForm}
          className="bg-red-500 hover:bg-red-400 active:bg-red-600 py-1 px-3 rounded-md text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
