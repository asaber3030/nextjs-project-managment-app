import { ChangeProfilePicture } from "@/app/_components/account/picture/profile-picture";
import { AccountHeaderMain } from "@/app/_components/account/title-section";

const AccountPicturePage = () => {
  return ( 
    <div>
      <AccountHeaderMain title="Change Profile Picture" label="Account Picture, Cover Background" />
      <ChangeProfilePicture />
    </div>
  );
}

export default AccountPicturePage