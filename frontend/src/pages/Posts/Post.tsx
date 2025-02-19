import { useState } from "react";
import { format } from "date-fns";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import { ProfileImage } from "../../types/types";
import { UserCircleIcon } from "@heroicons/react/24/outline";

interface Props {
  text: string;
  createdAt: number;
  username: string;
  commentsAvailable: boolean;
  id: string;
  profileImage?: ProfileImage;
}

const Post = ({
  text,
  createdAt,
  username,
  commentsAvailable,
  id,
  profileImage,
}: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const imgSrc = `data:${profileImage?.contentType};base64,${profileImage?.data}`;

  return (
    <>
      <div className="border-slate-300 border text-sm my-2 py-2 px-3 rounded-md">
        <div className="flex gap-2 mb-2">
          <div className="flex-shrink-0 w-10 h-10">
            {profileImage ? (
              <img
                src={imgSrc}
                className="rounded-full w-full h-full object-cover object-top"
              />
            ) : (
              <UserCircleIcon className="scale-110" />
            )}
          </div>
          <div className="font-semibold mb-1">{username}</div>
        </div>
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
