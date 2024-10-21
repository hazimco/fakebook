import { useQuery } from "@tanstack/react-query";
import usersService from "../../services/users";
import { IRefetchLoggedInUser, User as UserType } from "../../types/types";
import ProfileCard from "./ProfileCard";
import UserConnectionList from "./UserConnectionList";

interface Props {
  loggedInUser?: UserType;
  refetchLoggedInUser: IRefetchLoggedInUser;
}

const Profile = ({ loggedInUser, refetchLoggedInUser }: Props) => {
  const query = useQuery({ queryKey: ["users"], queryFn: usersService.getAll });

  const users = query.data;

  if (!users || !loggedInUser) return;

  const followingUsers: UserType[] = [];
  const followedByUsers: UserType[] = [];

  users.forEach((user) => {
    if (loggedInUser.following.includes(user.id)) {
      followingUsers.push(user);
    }
    if (loggedInUser.followedBy.includes(user.id)) {
      followedByUsers.push(user);
    }
  });

  return (
    <div>
      <ProfileCard
        username={loggedInUser.username}
        description={loggedInUser.description}
        profileImage={loggedInUser.profileImage}
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
