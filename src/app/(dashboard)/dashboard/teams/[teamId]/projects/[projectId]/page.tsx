import { TeamProject } from "@/types";

import { isMemberOfTeam } from "@/actions/check";
import { getTeamProject } from "@/actions/team";
import { notFound } from "next/navigation";

import { AllProjectBoards } from "@/app/_components/app/projects/boards/all-boards";
import { AllProjectTasks } from "@/app/_components/app/projects/tasks/all-tasks";
import { getCurrent, getTeam } from "@/actions/user-data";

type Props = {
  params: { teamId: string, projectId: string }
}

const ProjectIDPage = async ({ params }: Props) => {
  
  const data = await getTeamProject(parseInt(params.projectId))
  const isMember = await isMemberOfTeam(+params.teamId)
  const team = await getTeam(+params.teamId)
  const current = await getCurrent()

  const project: TeamProject = data.data
  
  if (!team) return notFound()
  if ((!isMember && current?.id != team.ownerId)) return notFound();

  return (
    <div>
      <AllProjectTasks project={project} />
      <AllProjectBoards project={project} />
    </div>
  );
}
 
export default ProjectIDPage;