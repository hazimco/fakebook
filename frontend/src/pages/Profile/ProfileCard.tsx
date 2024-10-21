import { IRefetchLoggedInUser, User } from "../../types/types";
import Description from "./Description";
import ProfileImage from "./ProfileImage";

interface Props {
  username: string;
  description: string;
  profileImage?: User["profileImage"];
  refetchLoggedInUser: IRefetchLoggedInUser;
}

const ProfileCard = ({
  username,
  description,
  profileImage,
  refetchLoggedInUser,
}: Props) => {
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

export default ProfileCard;
