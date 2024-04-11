import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import postsService from "../services/posts";

const postFormStyle = {
  container: {
    marginBottom: 20,
  },
};

const PostForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");

  const closeForm = () => {
    setShowForm(false);
    setText("");
  };

  const newPostMutation = useMutation({
    mutationFn: postsService.createNew,
    onSuccess: closeForm,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    newPostMutation.mutate({
      text,
    });
  };

  return (
    <div style={postFormStyle.container}>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              maxLength={140}
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <div>
              <button>Done</button>
              <button onClick={closeForm}>Cancel</button>
              {140 - text.length} characters left
            </div>
          </div>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)}>Create new post</button>
      )}
    </div>
  );
};

export default PostForm;
