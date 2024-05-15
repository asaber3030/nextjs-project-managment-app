import { TeamProject } from "@/types";
import { ProjectActionsButtons } from "./project-actions-buttons";

type Props = {
  project: TeamProject
}

export const ProjectHeaderTitle = ({ project }: Props) => {
  return ( 
    <header className='xl:flex text-center mb-4 xl:mb-4 xl:text-left justify-between items-center border-b pb-2'>
      <h1 className='font-bold text-2xl capitalize'>{project.name}</h1>
      <ProjectActionsButtons project={project} />
    </header>
  );
}