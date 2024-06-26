import { useMutation, useQueryClient } from "@tanstack/react-query";
import usersService from "../../services/users";

import { User as UserType } from "../../types/types";

interface Props {
  user: UserType;
  loggedInUser: UserType;
}

const User = ({ user, loggedInUser }: Props) => {
  const { username, id } = user;
  const postCount = user.posts.length;

  const followedByLoggedInUser = loggedInUser.following.includes(id);

  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: usersService.follow,
    onSuccess: (loggedInUserWithAddedFollow) => {
      queryClient.setQueryData(["loggedInUser"], loggedInUserWithAddedFollow);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: usersService.unfollow,
    onSuccess: (loggedInUserWithRemovedFollow) => {
      queryClient.setQueryData(["loggedInUser"], loggedInUserWithRemovedFollow);
    },
  });

  const handleClick = () => {
    followedByLoggedInUser
      ? unfollowMutation.mutate(id)
      : followMutation.mutate(id);
  };

  return (
    <div className="border-slate-300 border bg-white rounded-md py-2 px-4 mb-2 flex justify-between text-sm">
      <div className="max-w-52">
        <div className="font-semibold [word-break:break-word]">{username}</div>
        <div className="italic font-light">{postCount} posts</div>
      </div>
      {loggedInUser.id !== id && (
        <button
          onClick={handleClick}
          className="bg-slate-200 hover:bg-slate-100 active:bg-slate-300 rounded-md ml-6 py-1 px-2 self-center"
        >
          {followedByLoggedInUser ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default User;
