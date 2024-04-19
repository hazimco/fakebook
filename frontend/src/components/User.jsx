import { useMutation, useQueryClient } from "@tanstack/react-query";
import usersService from "../services/users";

const User = ({ user, loggedInUser }) => {
  const { username, postCount, id } = user;
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
      ? unfollowMutation.mutate({ id })
      : followMutation.mutate({ id });
  };

  return (
    <div className="user">
      <div className="username">{username}</div>
      <div className="postCount">{postCount} posts</div>
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
