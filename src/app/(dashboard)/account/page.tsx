import { testProjects } from "@/actions/user-data";
import { AccountHeaderMain } from "@/app/_components/account/title-section";
import { UpdateAccountDetails } from "@/app/_components/account/update-details";
import { authOptions } from "@/services/auth";
import { User } from "@/types";
import { getServerSession } from "next-auth";


const AccountPage = async () => {

  const session = await getServerSession(authOptions)
  const user = session?.user as unknown as User

  return ( 
    <div>
      <AccountHeaderMain title="Account Settings" label="Modify Your account Details" />
      <UpdateAccountDetails />
    </div>
  );
}

export default AccountPage