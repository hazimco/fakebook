import { useQuery } from "@tanstack/react-query";
import usersService from "../services/users";
import User from "./Users/User";
import { User as UserType } from "../types/types";

interface Props {
  loggedInUser: UserType;
}

const Profile = ({ loggedInUser }: Props) => {
  const query = useQuery({ queryKey: ["users"], queryFn: usersService.getAll });

  const users = query.data;

  if (!users) return;

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
      <h1 className="font-medium text-2xl mb-4">
        Profile of {loggedInUser.username}
      </h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <h4 className="text-lg font-medium">Following:</h4>
          {followingUsers.map((user) => (
            <User key={user.id} user={user} loggedInUser={loggedInUser} />
          ))}
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-medium">Followed by:</h4>
          {followedByUsers.map((user) => (
            <User key={user.id} user={user} loggedInUser={loggedInUser} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
