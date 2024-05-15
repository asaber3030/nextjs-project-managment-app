import { ChangeDirectCode } from "@/app/_components/account/settings/change-direct-code";
import { ChangePassword } from "@/app/_components/account/settings/change-password";
import { MainAccountSettings } from "@/app/_components/account/settings/main-settings";
import { AccountHeaderMain } from "@/app/_components/account/title-section";

type Props = {
 
}
const AccountSettingsPage = ({}: Props) => {
  return ( 
    <div>
      <AccountHeaderMain title="Main Settings" label="Change Password, Profile Picture" />
      <ChangePassword />
      <MainAccountSettings />
      <ChangeDirectCode />
    </div>
  );
}

export default AccountSettingsPage