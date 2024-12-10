import { Team } from "@/types"
import { SidebarJoinedTeamLink } from "./joined-team-link"
import { SidebarNoProjectsAlert } from "./sidebar-no-projects-alert"
import { SidebarJoinedTeamProjects } from "./joined-team-projects"

type Props = {
  team: Team
}

export const SidebarJoinedTeamItem = ({ team }: Props) => {
  return (
    <div className="w-full border bg-white p-2 rounded-md shadow-sm">
      <SidebarJoinedTeamLink team={team} />
      {team?.teamProjects?.length === 0 && <SidebarNoProjectsAlert />}
      <SidebarJoinedTeamProjects teamProjects={team.teamProjects} teamId={team.id} />
    </div>
  )
}
