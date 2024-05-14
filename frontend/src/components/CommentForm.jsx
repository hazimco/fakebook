import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import postsService from "../services/posts";

const CommentForm = ({ postId }) => {
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");

  const queryClient = useQueryClient();

  const closeForm = () => {
    setShowForm(false);
    setText("");
  };

  const addCommentMutation = useMutation({
    mutationFn: postsService.addComment,
    onSuccess: (newComment) => {
      const comments = queryClient.getQueryData(["post-comments", postId]);
      if (comments) {
        queryClient.setQueryData(
          ["post-comments", postId],
          [...comments, newComment]
        );
      }
      closeForm();
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    addCommentMutation.mutate({ text, id: postId });
  };

  return (
    <div>
      {showForm ? (
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
      ) : (
        <button onClick={() => setShowForm(true)}>Comment</button>
      )}
    </div>
  );
};

export default CommentForm;
