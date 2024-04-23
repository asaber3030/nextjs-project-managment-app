import { getTeam } from "@/actions/user-data"
import { CreateProjectView } from "@/app/_components/app/projects/views/create-project"
import { Team } from "@/types/user"

type Props = {
  params: { teamId: string }
}
const CreateProjectPage = async ({ params }: Props) => {
  
  const teamId = parseInt(params.teamId)
  const team = await getTeam(teamId) as Team

  return ( 
    <CreateProjectView team={team} />
  );
}

export default CreateProjectPage