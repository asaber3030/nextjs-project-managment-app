import { TeamSidebarSettings } from "@/app/_components/app/teams/team-sidebar";

import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth";

import { Permission } from "@/services/permissions";
import { TeamPermissionsProvider } from "@/providers/team-permission";

import { TeamPermissionsType } from "@/types";

type Props = {
  children: React.ReactNode,
  params: { teamId: string }
}

const TeamLayout = async ({ children, params }: Props) => {

  const session = await getServerSession(authOptions)
  const user = session?.user

  const teamId = Number(params.teamId)

  const permission = new Permission(user?.id as number)
  await permission.fetchUser()
  const teamPermissionsValues: TeamPermissionsType = {
    canCreateMoreTeamProjects: await permission.canCreateMoreTeamProjects(teamId),
    canAddMoreTeamMembers: await permission.canAddMoreTeamMembers(teamId),
  }

  return (
    <TeamPermissionsProvider value={teamPermissionsValues}>
      <div className='xl:flex gap-4'>
        <TeamSidebarSettings teamId={parseInt(params.teamId)} />
        <div className='xl:w-full w-full'>
          {children}
        </div>
      </div>
    </TeamPermissionsProvider>
  );
}
 
export default TeamLayout;