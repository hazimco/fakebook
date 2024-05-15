import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import postsService from "../services/posts";

import Comment from "./Comment";

interface Props {
  postId: string;
}

const Comments = ({ postId }: Props) => {
  const [showComments, setShowComments] = useState(false);

  const query = useQuery({
    queryKey: ["post-comments", postId],
    queryFn: () => postsService.getComments(postId),
    enabled: showComments,
  });

  const comments = query.data || [];

  const sortedComments = [...comments].sort(
    (a, b) => b.createdAt - a.createdAt
  );

  return (
    <div>
      {showComments ? (
        <div>
          {sortedComments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                text={comment.text}
                createdAt={comment.createdAt}
                username={comment.user.username}
              />
            );
          })}
        </div>
      ) : (
        <button onClick={() => setShowComments(true)}>Show comments</button>
      )}
    </div>
  );
};

export default Comments;
