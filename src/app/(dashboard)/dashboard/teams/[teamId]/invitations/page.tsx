import { getTeam } from "@/actions/user-data";
import { Team } from "@/types";
import { TeamInvitations } from "@/app/_components/app/teams/members/invitations/list";

import { isMemberOfTeam } from "@/actions/check"
import { notFound } from "next/navigation"

type Props = {
  params: { teamId: string }
}

const TeamMembersPage = async ({ params }: Props) => {
  const team = await getTeam(Number(params.teamId)) as unknown as Team
  const isMember = await isMemberOfTeam(+params.teamId)
  
  if (!isMember) return notFound();
  return (
    <TeamInvitations team={team} />
  );
}
 
export default TeamMembersPage;