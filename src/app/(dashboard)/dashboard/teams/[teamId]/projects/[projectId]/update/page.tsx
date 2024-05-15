import { isMemberOfTeam } from "@/actions/check";
import { getTeamProject } from "@/actions/team";
import { UpdateProjectView } from "@/app/_components/app/projects/views/update-project";
import { TeamProject } from "@/types";
import { notFound } from "next/navigation";

type Props = {
  params: { teamId:string, projectId: string }
}

const UpdateProjectIDPage = async ({ params }: Props) => {

  const data = await getTeamProject(parseInt(params.projectId))
  const isMember = await isMemberOfTeam(+params.teamId)
  const project: TeamProject = data.data

  if (!isMember) return notFound();

  return (
    <UpdateProjectView project={project} />
  );
}
 
export default UpdateProjectIDPage;