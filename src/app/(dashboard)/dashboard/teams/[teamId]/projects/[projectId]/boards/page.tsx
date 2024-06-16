import { TeamProject } from "@/types";
import { ViewAllTasks } from "@/app/_components/app/projects/tasks/view-all";

import { getTeamProject } from "@/actions/team";
import { isMemberOfTeam } from "@/actions/check";
import { notFound } from "next/navigation";
import { getCurrent, getTeam } from "@/actions/user-data";

type Props = {
  params: { teamId: string, projectId: string }
}

const ProjectIDTasksPage = async ({ params }: Props) => {
  
  const data = await getTeamProject(parseInt(params.projectId))
  const isMember = await isMemberOfTeam(+params.teamId)
  const current = await getCurrent()
  const team = await getTeam(+params.teamId)

  const project: TeamProject = data.data

  if (!team) return notFound();
  if ((!isMember && current?.id != team.ownerId)) return notFound();

  return (
    <ViewAllTasks project={project} />
  );
}
 
export default ProjectIDTasksPage;