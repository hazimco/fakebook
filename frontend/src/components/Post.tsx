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
      <div className="border-slate-300 border text-sm my-2 py-2 px-3 rounded-md">
        <div className="font-semibold mb-1">{username}</div>
        <div className="mb-3">{text}</div>
        <div className="text-xs">
          {format(createdAt, "HH:mm - MMM dd, yyyy")}
        </div>
        <CommentForm postId={id} />
      </div>
      {commentsAvailable && <Comments postId={id} />}
    </>
  );
};

export default Post;
