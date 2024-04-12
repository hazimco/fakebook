import { format } from "date-fns";

const Post = ({ text, createdAt, username }) => {
  return (
    <div className="post">
      <div className="username">{username}</div>
      <div className="text">{text}</div>
      <div className="createdAt">
        {format(createdAt, "HH:mm - MMM dd, yyyy")}
      </div>
    </div>
  );
};

export default Post;
