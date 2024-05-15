import { getTeam } from "@/actions/user-data";
import { Team } from "@/types";
import { ListTeamMembers } from "@/app/_components/app/teams/members/list";
import { notFound } from "next/navigation";
import { isMemberOfTeam } from "@/actions/check";

type Props = {
  params: { teamId: string }
}

const TeamMembersPage = async ({ params }: Props) => {
  
  const team = await getTeam(Number(params.teamId)) as unknown as Team
  const isMember = await isMemberOfTeam(+params.teamId)
  
  if (!isMember) return notFound();
  
  return (
    <ListTeamMembers team={team} />
  );
}
 
export default TeamMembersPage;