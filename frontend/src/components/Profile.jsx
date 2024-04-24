import { useQuery } from "@tanstack/react-query";
import usersService from "../services/users";
import User from "./User";

const Profile = ({ loggedInUser }) => {
  const query = useQuery({ queryKey: ["users"], queryFn: usersService.getAll });

  const users = query.data;

  if (!users) return;

  const followingUsers = [];
  const followedByUsers = [];

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
      <div className="following-followed">
        <div className="column">
          <h4>Following:</h4>
          {followingUsers.map((user) => (
            <User key={user.id} user={user} loggedInUser={loggedInUser} />
          ))}
        </div>
        <div className="column">
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
