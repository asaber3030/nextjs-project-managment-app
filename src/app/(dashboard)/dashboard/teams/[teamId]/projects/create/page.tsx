import { isMemberOfTeam } from "@/actions/check"
import { getTeam } from "@/actions/user-data"
import { notFound } from "next/navigation"

import { CreateProjectView } from "@/app/_components/app/projects/views/create-project"
import { Team } from "@/types"

type Props = {
  params: { teamId: string }
}
const CreateProjectPage = async ({ params }: Props) => {
  
  const teamId = parseInt(params.teamId)
  const team = await getTeam(teamId) as Team
  const isMember = await isMemberOfTeam(+params.teamId)
  
  if (!isMember) return notFound();
  return ( 
    <CreateProjectView team={team} />
  );
}

export default CreateProjectPage