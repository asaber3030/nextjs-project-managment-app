import { getTeam } from "@/actions/user-data";
import { TeamHeaderSection } from "@/app/_components/app/team-section-header";
import { DisplayTeamInfo } from "@/app/_components/app/teams/display-team-info";
import { Team } from "@/types/user";
import { Users } from "lucide-react";

type Props = {
  params: { teamId: string }
}

const SingleTeamPage = async ({ params }: Props) => {
  
  const team = await getTeam(parseInt(params.teamId)) as Team

  return (
    <div>
      <TeamHeaderSection label={`${team.name}'s Dashboard`} icon={Users} />
      <DisplayTeamInfo team={team} />
    </div>
  );
}
 
export default SingleTeamPage;