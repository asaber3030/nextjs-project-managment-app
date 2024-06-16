import Link from "next/link";

import { TeamProject } from "@/types";
import { ProjectActionsButtons } from "./project-actions-buttons";
import { route } from "@/lib/route";

type Props = {
  project: TeamProject
}

export const ProjectHeaderTitle = ({ project }: Props) => {
  return ( 
    <header className='xl:flex text-center mb-4 xl:mb-4 xl:text-left justify-between items-center border-b pb-2'>
      <Link href={route.viewTeamProject(project.teamId, project.id)} className='font-medium text-2xl hover:underline capitalize'>{project.name}</Link>
      <ProjectActionsButtons project={project} />
    </header>
  );
}