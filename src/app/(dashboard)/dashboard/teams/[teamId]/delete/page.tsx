import { isMemberOfTeam } from "@/actions/check"
import { getCurrent, getTeam } from "@/actions/user-data"
import { notFound } from "next/navigation"

import { DeleteTeamView } from "@/app/_components/app/teams/delete-team"
import { Team } from "@/types"

type Props = {
  params: { teamId: string }
}

const DeleteTeamPage = async ({ params }: Props) => {

  const teamId = +params.teamId
  const team = await getTeam(teamId) as unknown as Team
  const isMember = await isMemberOfTeam(teamId)
  const current = await getCurrent()

  if (!team) return notFound();
  if ((!isMember && current?.id != team.ownerId)) return notFound();
  

  return (
    <DeleteTeamView team={team as unknown as Team} />
  );
}
 
export default DeleteTeamPage;