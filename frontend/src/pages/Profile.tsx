import { useRef } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import usersService from "../services/users";
import User from "./Users/User";
import { User as UserType } from "../types/types";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import useMutationWithNotificationOnError from "../hooks/useMutationWithNotificationOnError";
import ErrorNotification from "../components/ErrorNotification";

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

interface ProfileImageProps {
  imgUrl?: string;
  username: string;
  refetchLoggedInUser: IRefetchLoggedInUser;
}

const ProfileImage = ({
  imgUrl,
  username,
  refetchLoggedInUser,
}: ProfileImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutation: uploadProfileImageMutation, notification: error } =
    useMutationWithNotificationOnError({
      mutationFn: usersService.uploadProfileImage,
      onSuccess: (response) => {
        console.log(response);
        refetchLoggedInUser();
      },
    });

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append("profileImage", selectedFile);

      uploadProfileImageMutation.mutate(formData);
    }
  };

  return (
    <div className="flex flex-col">
      {imgUrl ? (
        <img src={imgUrl} alt={`profile picture of ${username}`} />
      ) : error ? (
        <ErrorNotification message={error} className="text-xs" />
      ) : (
        <UserCircleIcon />
      )}
      <button
        onClick={handleClick}
        className="border border-slate-400 bg-slate-300 rounded-md text-sm"
      >
        Edit
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        hidden
      />
    </div>
  );
};

interface ProfileCardProps {
  username: string;
  description: string;
  profileImage?: UserType["profileImage"];
  refetchLoggedInUser: IRefetchLoggedInUser;
}

const ProfileCard = ({
  username,
  description,
  profileImage,
  refetchLoggedInUser,
}: ProfileCardProps) => {
  const imgUrl =
    profileImage &&
    `data:${profileImage?.contentType};base64,${profileImage?.data}`;

  return (
    <div className="bg-slate-200 p-4 mb-3 rounded-md flex gap-x-4">
      <ProfileImage
        imgUrl={imgUrl}
        username={username}
        refetchLoggedInUser={refetchLoggedInUser}
      />
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-xl [word-break:break-word] leading-none">
          {username}
        </h1>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

interface IRefetchLoggedInUser {
  (options?: RefetchOptions): Promise<QueryObserverResult<UserType, Error>>;
}

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
        description={
          "Christopher Edward Nolan (born 30 July 1970) is a British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling, he is considered a leading filmmaker of the 21st century."
        }
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
