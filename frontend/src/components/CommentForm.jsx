import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import postsService from "../services/posts";

const CommentForm = ({ postId }) => {
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");

  const closeForm = () => {
    setShowForm(false);
    setText("");
  };

  const addCommentMutation = useMutation({
    mutationFn: postsService.addComment,
    onSuccess: () => {
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
