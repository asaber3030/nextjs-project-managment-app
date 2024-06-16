import React from "react";


import db from "@/services/prisma";

import { Permission } from "@/services/permissions";
import { GlobalPermissionsProivder } from "@/providers/global-permissions";
import { GlobalPermissionsType, Subscription } from "@/types";

import { UserSidebar } from "../_components/app/sidebar/sidebar";

import { getServerSession } from "next-auth";
import { getPersonalTasksStats, lastSubscription } from "@/actions/user-data";
import { authOptions } from "@/services/auth";
import { Status } from "@prisma/client";

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

  const lastSub = await lastSubscription() as Subscription

  const countTasks = await db.teamProjectTasks.count({
    where: { userId: user?.id, status: Status.Pending }
  })

  const stats = await getPersonalTasksStats()

  return (
    <GlobalPermissionsProivder value={globalPermissionsValues}>
      <div className='flex'>
        <UserSidebar countTasks={countTasks} subscription={lastSub} stats={stats} />
        <div className='xl:pl-[362px] pr-[22px] py-[22px] w-full px-[22px]'>
          {children}
        </div>
      </div>
    </GlobalPermissionsProivder>
  );
}
 
export default AuthenticatedLayout;