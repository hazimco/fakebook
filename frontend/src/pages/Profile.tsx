import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import usersService from "../services/users";
import User from "./Users/User";
import { IRefetchLoggedInUser, User as UserType } from "../types/types";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import useMutationWithNotificationOnError from "../hooks/useMutationWithNotificationOnError";
import ErrorNotification from "../components/ErrorNotification";
import useUploadProfileImage from "../hooks/useUploadProfileImage";

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
    useUploadProfileImage({ refetchLoggedInUser });

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
    <div className="flex flex-col w-24 h-32 flex-shrink-0 justify-between">
      {imgUrl ? (
        <img
          src={imgUrl}
          alt={`profile picture of ${username}`}
          className="w-full h-24 rounded-full object-cover object-top"
        />
      ) : error ? (
        <ErrorNotification
          message={error}
          className="text-sm h-full flex items-center justify-center"
        />
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
      <div className="flex flex-col gap-1 flex-1">
        <h1 className="font-bold text-xl [word-break:break-word] leading-none">
          {username}
        </h1>
        <Description description={description} />
      </div>
    </div>
  );
};

interface IDescription {
  description: string;
}

const Description = ({ description }: IDescription) => {
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");

  const queryClient = useQueryClient();

  const { mutation: editDescriptionMutation, notification: error } =
    useMutationWithNotificationOnError({
      mutationFn: usersService.editDescription,
      onSuccess: (response) => {
        const user = queryClient.getQueryData<UserType>(["loggedInUser"]);
        queryClient.setQueryData(["loggedInUser"], {
          ...user,
          description: response.description,
        });
      },
    });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    editDescriptionMutation.mutate(text);
    setText("");
    setShowForm(false);
  };

  return showForm ? (
    <form
      className="flex flex-col flex-1 text-sm gap-2"
      onSubmit={handleSubmit}
    >
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="py-1.5 px-2 border-blue-400 border rounded-md resize-none flex-1"
        autoFocus
        maxLength={240}
      >
        {description}
      </textarea>
      <div className="flex gap-2">
        <button className="bg-green-300 hover:bg-green-200 active:bg-green-400 px-3 rounded-md">
          Done
        </button>
        <button
          onClick={() => setShowForm(false)}
          className="bg-red-500 hover:bg-red-400 active:bg-red-600 px-3 rounded-md text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  ) : (
    <>
      {description && <p className="text-sm">{description}</p>}
      <button
        onClick={() => setShowForm(true)}
        className="border border-slate-400 bg-slate-300 rounded-md text-sm self-start px-1.5"
      >
        {description ? "Edit description" : "Add description"}
      </button>
      <ErrorNotification message={error} />
    </>
  );
};

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
