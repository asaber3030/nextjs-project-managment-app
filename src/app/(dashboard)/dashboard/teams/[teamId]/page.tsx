import { getTeamAnalytics } from "@/actions/team";
import { getCurrent, getTeam } from "@/actions/user-data";
import { isMemberOfTeam } from "@/actions/check";
import { notFound } from "next/navigation";

import { DisplayTeamInfo } from "@/app/_components/app/teams/team-view";
import { Team } from "@/types";

type Props = {
  params: { teamId: string }
}

const SingleTeamPage = async ({ params }: Props) => {
  
  const team = await getTeam(+params.teamId) as Team
  const analytics = await getTeamAnalytics(+params.teamId)
  const isMember = await isMemberOfTeam(+params.teamId)

  const current = await getCurrent()

  if (!team || (!isMember && current?.id != team.ownerId)) return notFound();

  return (
    <DisplayTeamInfo 
      analytics={analytics} 
      team={team} 
    />
  );
}
 
export default SingleTeamPage;