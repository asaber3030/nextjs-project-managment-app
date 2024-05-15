import React from "react";
import UserSidebar from "../_components/app/sidebar/sidebar";

import { GlobalPermissionsProivder } from "@/providers/global-permissions";

import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth";
import { Permission } from "@/services/permissions";
import { GlobalPermissionsType, Notification } from "@/types";
import { getNotifications } from "@/actions/user-data";
import { NotificationsProvider } from "@/providers/notifications";

const AuthenticatedLayout = async ({ children }: { children: React.ReactNode }) => {

  const session = await getServerSession(authOptions)
  const user = session?.user

  const permission = new Permission(user?.id as number)
  await permission.fetchUser()

  const globalPermissionsValues: GlobalPermissionsType = {
    hasMailSystem: await permission.hasMailSystem(),
    hasAnalytics: await permission.hasAnalytics(),
    hasCharts: await permission.hasCharts(),
    canDirectAdd: await permission.canDirectAdd(),
    canCreateMorePersonalProjects: await permission.canCreateMorePersonalProjects(),
    canCreateMorePersonalTasks: await permission.canCreateMorePersonalTasks(),
    canCreateMorePersonalBoards: await permission.canCreateMorePersonalBoards(),
    canCreateMoreTeams: await permission.canCreateMoreTeams()
  }


  return (
    <GlobalPermissionsProivder value={globalPermissionsValues}>
      <div className='flex'>
        <UserSidebar />
        <div className='xl:pl-[372px] pr-[22px] py-[22px] w-full px-[22px]'>
          {children}
        </div>
      </div>
    </GlobalPermissionsProivder>
  );
}
 
export default AuthenticatedLayout;