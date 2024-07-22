import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import postsService from "../../services/posts";
import { Post } from "../../types/types";
import ErrorNotification from "../../components/ErrorNotification";
import useNotification from "../../hooks/useNotification";
import axios from "axios";

const PostForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");

  const [error, setError] = useNotification();

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
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error || error.message);
      } else {
        setError("Unknown error: " + error);
      }
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    newPostMutation.mutate(text);
  };

  return (
    <div className="mb-5 text-sm">
      {showForm ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            placeholder="Write something..."
            maxLength={140}
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="py-1.5 px-2 border-blue-400 border rounded-md"
          />
          <div className="flex gap-2">
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
            <div className="self-end">{140 - text.length} characters left</div>
          </div>
          <ErrorNotification message={error} />
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-400 text-white hover:bg-blue-500 active:bg-blue-600 font-medium rounded-md p-1.5"
        >
          Create new post
        </button>
      )}
    </div>
  );
};

export default PostForm;
