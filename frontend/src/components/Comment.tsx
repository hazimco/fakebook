import { format } from "date-fns";

const Comment = ({ text, createdAt, username }) => {
  return (
    <div
      className="post"
      style={{ backgroundColor: "rgb(255, 255, 230)", marginLeft: 100 }}
    >
      <div className="username">{username}</div>
      <div className="text">{text}</div>
      <div className="createdAt">
        {format(createdAt, "HH:mm - MMM dd, yyyy")}
      </div>
    </div>
  );
};

export default Comment;
