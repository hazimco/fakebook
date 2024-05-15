import { useMutation, useQueryClient } from "@tanstack/react-query";
import usersService from "../services/users";

import { User as UserType } from "../types/types";

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
    <div>
      <div>
        <div>{username}</div>
        <div>{postCount} posts</div>
      </div>
      <div>
        {loggedInUser.id !== id && (
          <button onClick={handleClick}>
            {followedByLoggedInUser ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
    </div>
  );
};

export default User;
