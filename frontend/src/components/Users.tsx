import { useQuery } from "@tanstack/react-query";
import usersService from "../services/users";
import User from "./User";
import { User as UserType } from "../types/types";

interface Props {
  loggedInUser: UserType;
}

const Users = ({ loggedInUser }: Props) => {
  const query = useQuery({ queryKey: ["users"], queryFn: usersService.getAll });

  if (query.isPending) return <div>loading</div>;
  if (query.isError) return <div>could not fetch users</div>;

  const users = query.data;

  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <User key={user.id} user={user} loggedInUser={loggedInUser} />
      ))}
    </div>
  );
};

export default Users;
