import { isMemberOfTeam } from "@/actions/check"
import { getTeam } from "@/actions/user-data"
import { notFound } from "next/navigation"

import { DeleteTeamView } from "@/app/_components/app/teams/delete-team"
import { Team } from "@/types"

type Props = {
  params: { teamId: string }
}

const DeleteTeamPage = async ({ params }: Props) => {

  const teamId = Number(params.teamId)
  const team = await getTeam(teamId)

  const isMember = await isMemberOfTeam(+params.teamId)
  if (!isMember) return notFound();

  return (
    <DeleteTeamView team={team as unknown as Team} />
  );
}
 
export default DeleteTeamPage;