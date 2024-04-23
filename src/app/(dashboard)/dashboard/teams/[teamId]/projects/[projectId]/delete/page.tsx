import { getTeamProject } from "@/actions/team";
import { DeleteProjectView } from "@/app/_components/app/projects/views/delete-project";
import { UpdateProjectView } from "@/app/_components/app/projects/views/update-project";
import { TeamProject } from "@prisma/client";

type Props = {
  params: { projectId: string }
}

const DeleteProjectIDPage = async ({ params }: Props) => {

  const data = await getTeamProject(parseInt(params.projectId))
  const project: TeamProject = data.data

  return (
    <DeleteProjectView project={project} />
  );
}
 
export default DeleteProjectIDPage;