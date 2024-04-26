import { format } from "date-fns";
import CommentForm from "../components/CommentForm";

const Post = ({ text, createdAt, username, id }) => {
  return (
    <div className="post">
      <div className="username">{username}</div>
      <div className="text">{text}</div>
      <div className="createdAt">
        {format(createdAt, "HH:mm - MMM dd, yyyy")}
      </div>
      <CommentForm postId={id} />
    </div>
  );
};

export default Post;
