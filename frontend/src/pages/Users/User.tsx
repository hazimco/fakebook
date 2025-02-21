import { useQueryClient } from "@tanstack/react-query";
import usersService from "../../services/users";
import { User as UserType } from "../../types/types";
import ErrorNotification from "../../components/ErrorNotification";

import useMutationWithNotificationOnError from "../../hooks/useMutationWithNotificationOnError";
import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";

interface Props {
  user: UserType;
  loggedInUser: UserType;
}

const User = ({ user, loggedInUser }: Props) => {
  const { username, id, profileImage } = user;
  const postCount = user.posts.length;

  const followedByLoggedInUser = loggedInUser.following.includes(id);

  const queryClient = useQueryClient();

  const { mutation: followMutation, notification: followMutationError } =
    useMutationWithNotificationOnError({
      mutationFn: usersService.follow,
      onSuccess: (loggedInUserWithAddedFollow) => {
        queryClient.setQueryData(["loggedInUser"], loggedInUserWithAddedFollow);
      },
    });

  const { mutation: unfollowMutation, notification: unfollowMutationError } =
    useMutationWithNotificationOnError({
      mutationFn: usersService.unfollow,
      onSuccess: (loggedInUserWithRemovedFollow) => {
        queryClient.setQueryData(
          ["loggedInUser"],
          loggedInUserWithRemovedFollow
        );
      },
    });

  const handleClick = () => {
    followedByLoggedInUser
      ? unfollowMutation.mutate(id)
      : followMutation.mutate(id);
  };

  const imgSrc = `data:${profileImage?.contentType};base64,${profileImage?.data}`;

  return (
    <div className="border-slate-300 border bg-white rounded-md py-2 px-4 mb-2 text-sm">
      <div className="flex justify-between">
        <Link
          to={`/users/${user.id}`}
          className="max-w-52 flex gap-2 items-center"
        >
          <div className="flex-shrink-0 w-14 h-14">
            {profileImage ? (
              <img
                src={imgSrc}
                className="w-full h-full rounded-full object-cover object-top"
              />
            ) : (
              <UserCircleIcon className="scale-110" />
            )}
          </div>
          <div className="">
            <div className="font-semibold [word-break:break-word]">
              {username}
            </div>
            <div className="italic font-light">{postCount} posts</div>
          </div>
        </Link>
        {loggedInUser.id !== id && (
          <button
            onClick={handleClick}
            className="bg-slate-200 hover:bg-slate-100 active:bg-slate-300 rounded-md ml-6 py-1 px-2 self-center"
          >
            {followedByLoggedInUser ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
      <ErrorNotification
        message={followMutationError || unfollowMutationError}
      />
    </div>
  );
};

export default User;
