import { format } from "date-fns";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

interface Props {
  text: string;
  createdAt: number;
  username: string;
  commentsAvailable: boolean;
  id: string;
}

const Post = ({ text, createdAt, username, commentsAvailable, id }: Props) => {
  return (
    <>
      <div className="post">
        <div className="username">{username}</div>
        <div className="text">{text}</div>
        <div className="createdAt">
          {format(createdAt, "HH:mm - MMM dd, yyyy")}
        </div>
        <CommentForm postId={id} />
      </div>
      {commentsAvailable && <Comments postId={id} />}
    </>
  );
};

export default Post;
