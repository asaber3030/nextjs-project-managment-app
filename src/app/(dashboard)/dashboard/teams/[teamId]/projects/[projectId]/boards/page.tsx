import { getTeamProject } from "@/actions/team";

import { TeamProject } from "@/types";

import { ViewAllTasks } from "@/app/_components/app/projects/tasks/view-all";
import { isMemberOfTeam } from "@/actions/check";
import { notFound } from "next/navigation";

type Props = {
  params: { teamId: string, projectId: string }
}

const ProjectIDTasksPage = async ({ params }: Props) => {
  
  const data = await getTeamProject(parseInt(params.projectId))
  const isMember = await isMemberOfTeam(+params.teamId)

  const project: TeamProject = data.data
  
  if (!isMember) return notFound();

  return (
    <ViewAllTasks project={project} />
  );
}
 
export default ProjectIDTasksPage;