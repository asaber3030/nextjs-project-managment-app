import { Team, TeamMember } from "@/types/user";
import { DisplayTeamMembers } from "./display-team-members";
import { DisplayTeamAnalytics } from "./display-team-analytics";
import { DisplayTeamProjects } from "./display-team-projects";

type Props = {
  team: Team
}

export const DisplayTeamInfo = ({ team }: Props) => {
  return (
    <div className='space-y-4'>
      <DisplayTeamMembers members={team.members} />
      <DisplayTeamAnalytics team={team} />
      <DisplayTeamProjects team={team} />
    </div>
  );
}