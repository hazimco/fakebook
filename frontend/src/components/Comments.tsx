import { useQuery } from "@tanstack/react-query";
import postsService from "../services/posts";

import Comment from "./Comment";

interface Props {
  postId: string;
  showComments: boolean;
}

const Comments = ({ postId, showComments }: Props) => {
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
  );
};

export default Comments;
