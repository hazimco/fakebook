import { useRef } from "react";
import { IRefetchLoggedInUser } from "../../types/types";
import useUploadProfileImage from "../../hooks/useUploadProfileImage";
import ErrorNotification from "../../components/ErrorNotification";
import { UserCircleIcon } from "@heroicons/react/24/outline";

interface Props {
  imgUrl?: string;
  username: string;
  refetchLoggedInUser: IRefetchLoggedInUser;
}

const ProfileImage = ({ imgUrl, username, refetchLoggedInUser }: Props) => {
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

export default ProfileImage;
