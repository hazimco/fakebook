import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import postsService from "../services/posts";
import { Post } from "../types/types";

const PostForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");

  const queryClient = useQueryClient();

  const closeForm = () => {
    setShowForm(false);
    setText("");
  };

  const newPostMutation = useMutation({
    mutationFn: postsService.createNew,
    onSuccess: (newPost) => {
      const posts = queryClient.getQueryData<Post[]>(["posts"]) || [];
      queryClient.setQueryData(["posts"], [...posts, newPost]);

      closeForm();
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    newPostMutation.mutate(text);
  };

  return (
    <div className="create-post">
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Write something..."
            maxLength={140}
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <div className="bottom-container">
            <div className="button-group">
              <button>Done</button>
              <button onClick={closeForm}>Cancel</button>
            </div>
            {140 - text.length} characters left
          </div>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)}>Create new post</button>
      )}
    </div>
  );
};

export default PostForm;
