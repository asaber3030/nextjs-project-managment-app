import { TeamProject } from "@/types";

import { isMemberOfTeam } from "@/actions/check";
import { getTeamProject } from "@/actions/team";
import { notFound } from "next/navigation";

import { AllProjectBoards } from "@/app/_components/app/projects/boards/all-boards";
import { AllProjectTasks } from "@/app/_components/app/projects/tasks/all-tasks";

type Props = {
  params: { teamId: string, projectId: string }
}

const ProjectIDPage = async ({ params }: Props) => {
  
  const data = await getTeamProject(parseInt(params.projectId))
  const isMember = await isMemberOfTeam(+params.teamId)

  const project: TeamProject = data.data
  
  if (!isMember) return notFound();

  return (
    <div>
      <AllProjectTasks project={project} />
      <AllProjectBoards project={project} />
    </div>
  );
}
 
export default ProjectIDPage;