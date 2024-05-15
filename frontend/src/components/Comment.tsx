import { format } from "date-fns";

interface Props {
  text: string;
  createdAt: number;
  username: string;
}

const Comment = ({ text, createdAt, username }: Props) => {
  return (
    <div style={{ backgroundColor: "rgb(255, 255, 230)", marginLeft: 100 }}>
      <div>{username}</div>
      <div>{text}</div>
      <div>{format(createdAt, "HH:mm - MMM dd, yyyy")}</div>
    </div>
  );
};

export default Comment;
