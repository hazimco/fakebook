import { format } from "date-fns";

interface Props {
  text: string;
  createdAt: number;
  username: string;
}

const Comment = ({ text, createdAt, username }: Props) => {
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
