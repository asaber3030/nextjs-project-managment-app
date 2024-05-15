import { TeamProjectPermissionsProvider } from "@/providers/project-permissions";

import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth";

import { Permission } from "@/services/permissions";
import { TeamProjectPermissionsType } from "@/types";

type Props = {
  children: React.ReactNode,
  params: { teamId: string, projectId: string }
}

const ProjectIDLayout = async ({ children, params }: Props) => {
  
  const projectId = Number(params.projectId)
  const teamId = Number(params.teamId)

  const session = await getServerSession(authOptions)
  const user = session?.user

  const permission = new Permission(user?.id as number)
  await permission.fetchUser()
  const teamProjectPermissionsValues: TeamProjectPermissionsType = {
    canCreateMoreBoards: await permission.canCreateMoreBoards(teamId, projectId),
    canCreateMoreTasks: await permission.canCreateMoreTasks(teamId, projectId),
  }

  return (
    <TeamProjectPermissionsProvider value={teamProjectPermissionsValues}>
      {children}
    </TeamProjectPermissionsProvider>
  );
}
 
export default ProjectIDLayout;