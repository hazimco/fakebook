import { useQuery } from "@tanstack/react-query";
import usersService from "../services/users";
import User from "./Users/User";
import { User as UserType } from "../types/types";

interface UserConnectionListProps {
  title: string;
  userConnections: UserType[];
  loggedInUser: UserType;
}

const UserConnectionList = ({
  title,
  userConnections,
  loggedInUser,
}: UserConnectionListProps) => {
  return (
    <div className="flex-1">
      <h4 className="text-lg font-medium">{title}</h4>
      {userConnections.map((user) => (
        <User key={user.id} user={user} loggedInUser={loggedInUser} />
      ))}
    </div>
  );
};

interface ProfileCardProps {
  username: string;
  description: string;
}

const ProfileCard = ({ username, description }: ProfileCardProps) => {
  return (
    <div className="border-fuchsia-400 border flex gap-x-4">
      <img src={""} alt={`profile picture of ${username}`} />
      <div className="flex-col gap-5">
        <h1 className="font-medium text-2xl">{username}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

interface Props {
  loggedInUser?: UserType;
}

const Profile = ({ loggedInUser }: Props) => {
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
        description={
          "Christopher Edward Nolan (born 30 July 1970) is a British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling, he is considered a leading filmmaker of the 21st century."
        }
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
