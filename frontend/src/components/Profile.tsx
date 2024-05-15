import { useQuery } from "@tanstack/react-query";
import usersService from "../services/users";
import User from "./User";
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
      <h1>Profile of {loggedInUser.username}</h1>
      <div>
        <div>
          <h4>Following:</h4>
          {followingUsers.map((user) => (
            <User key={user.id} user={user} loggedInUser={loggedInUser} />
          ))}
        </div>
        <div>
          <h4>Followed by:</h4>
          {followedByUsers.map((user) => (
            <User key={user.id} user={user} loggedInUser={loggedInUser} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
