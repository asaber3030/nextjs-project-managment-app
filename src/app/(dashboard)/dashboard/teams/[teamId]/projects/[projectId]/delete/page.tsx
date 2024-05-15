import { isMemberOfTeam } from "@/actions/check";
import { getTeamProject } from "@/actions/team";
import { notFound } from "next/navigation";

import { TeamProject } from "@/types";

import { DeleteProjectView } from "@/app/_components/app/projects/views/delete-project";

type Props = {
  params: { teamId: string, projectId: string }
}

const DeleteProjectIDPage = async ({ params }: Props) => {

  const data = await getTeamProject(parseInt(params.projectId))
  const isMember = await isMemberOfTeam(+params.teamId)

  const project: TeamProject = data.data
 
  if (!isMember) return notFound();

  return (
    <DeleteProjectView project={project} />
  );
}
 
export default DeleteProjectIDPage;