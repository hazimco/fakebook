import { format } from "date-fns";

interface Props {
  text: string;
  createdAt: number;
  username: string;
}

const Comment = ({ text, createdAt, username }: Props) => {
  return (
    <div className="bg-slate-100 border-slate-300 border-2 rounded-md py-1.5 px-3">
      <div className="font-semibold">{username}</div>
      <div>{text}</div>
      <div className="mt-2 text-xs">
        {format(createdAt, "HH:mm - MMM dd, yyyy")}
      </div>
    </div>
  );
};

export default Comment;
