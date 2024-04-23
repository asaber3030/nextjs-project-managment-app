import { getTeamProject } from "@/actions/team";
import { UpdateProjectView } from "@/app/_components/app/projects/views/update-project";
import { TeamProject } from "@prisma/client";

type Props = {
  params: { projectId: string }
}

const UpdateProjectIDPage = async ({ params }: Props) => {

  const data = await getTeamProject(parseInt(params.projectId))
  const project: TeamProject = data.data

  return (
    <UpdateProjectView project={project} />
  );
}
 
export default UpdateProjectIDPage;