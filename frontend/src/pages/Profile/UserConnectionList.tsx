import { User as UserType } from "../../types/types";
import User from "../Users/User";

interface Props {
  title: string;
  userConnections: UserType[];
  loggedInUser: UserType;
}

const UserConnectionList = ({
  title,
  userConnections,
  loggedInUser,
}: Props) => {
  return (
    <div className="flex-1">
      <h4 className="text-lg font-medium">{title}</h4>
      {userConnections.map((user) => (
        <User key={user.id} user={user} loggedInUser={loggedInUser} />
      ))}
    </div>
  );
};

export default UserConnectionList;
