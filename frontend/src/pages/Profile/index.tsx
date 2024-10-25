import { useQuery } from "@tanstack/react-query";
import usersService from "../../services/users";
import { IRefetchLoggedInUser, User as UserType } from "../../types/types";
import ProfileCard from "./ProfileCard";
import UserConnectionList from "./UserConnectionList";
import { useParams } from "react-router-dom";

interface Props {
  loggedInUser?: UserType;
  refetchLoggedInUser: IRefetchLoggedInUser;
}

const Profile = ({ loggedInUser, refetchLoggedInUser }: Props) => {
  const query = useQuery({ queryKey: ["users"], queryFn: usersService.getAll });

  const userId = useParams().id;

  const users = query.data;

  if (!users || !loggedInUser) return;

  // either show the user with the current id in the path /users/:id, or if that's not available, then we display the logged in user
  const profileUser =
    (userId && users.find((u) => u.id === userId)) || loggedInUser;

  const followingUsers: UserType[] = [];
  const followedByUsers: UserType[] = [];

  users.forEach((user) => {
    if (profileUser.following.includes(user.id)) {
      followingUsers.push(user);
    }
    if (profileUser.followedBy.includes(user.id)) {
      followedByUsers.push(user);
    }
  });

  return (
    <div>
      <ProfileCard
        username={profileUser.username}
        description={profileUser.description}
        profileImage={profileUser.profileImage}
        refetchLoggedInUser={refetchLoggedInUser}
      />
      <div className="flex flex-col sm:flex-row gap-4">
        <UserConnectionList
          title={"Following:"}
          userConnections={followingUsers}
          loggedInUser={loggedInUser}
        />
        <UserConnectionList
          title={"Followed by:"}
          userConnections={followedByUsers}
          loggedInUser={loggedInUser}
        />
      </div>
    </div>
  );
};

export default Profile;
