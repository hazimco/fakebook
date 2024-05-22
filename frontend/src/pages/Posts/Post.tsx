import { useState } from "react";
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
  const [showForm, setShowForm] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <>
      <div className="border-slate-300 border text-sm my-2 py-2 px-3 rounded-md">
        <div className="font-semibold mb-1">{username}</div>
        <div className="mb-3">{text}</div>
        <div className="text-xs">
          {format(createdAt, "HH:mm - MMM dd, yyyy")}
        </div>
        <div className="my-2 flex justify-between">
          {showForm ? (
            <CommentForm postId={id} setShowForm={setShowForm} />
          ) : (
            <StyledPostButton onClick={() => setShowForm(true)}>
              Add comment
            </StyledPostButton>
          )}
          {commentsAvailable && !showComments && (
            <StyledPostButton onClick={() => setShowComments(true)}>
              Show comments
            </StyledPostButton>
          )}
        </div>
        {showComments && <Comments postId={id} showComments={showComments} />}
      </div>
    </>
  );
};

const StyledPostButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <button
      {...props}
      className="bg-slate-300 py-1 px-2 rounded-md hover:bg-slate-200 active:bg-slate-400 self-start"
    ></button>
  );
};

export default Post;
