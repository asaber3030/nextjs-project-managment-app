"use client";

import Link from "next/link";

import { Clock, Github, Link2 } from "lucide-react";
import { ProjectActionsButtons } from "./project-actions-buttons";

import { diffForHuman } from "@/lib/date";
import { route } from "@/lib/route";
import { TeamProject } from "@/types";
import { useProjectStats } from "@/hooks/useProjects";
import { OnlySpinner } from "@/components/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Props = { project: TeamProject }

export const ProjectCard = ({ project }: Props) => {

  const { stats, isStatsLoading } = useProjectStats(project.id)

  return ( 
    <div key={`project-view-idx-${project.id}`} className='bg-white p-4 border rounded-md shadow-sm py-4 h-fit'>

      <Link href={route.viewTeamProject(project.teamId, project.id)} className='block mx-auto text-xl mb-1 font-semibold text-center hover:underline line-clamp-1'>{project.name}</Link>
      <p className='text-gray-500 text-xs mt-2 line-clamp-4 leading-5 mb-3'>{project.description}</p>

      <ul className="pt-2 space-y-3">
        {project.github && (
          <li className='flex justify-between items-center text-sm'>
            <span className='flex gap-2 items-center font-medium text-xs'><Github className='size-4' /> Github Repo</span>
            <a target="_blank" href={project.github} className='text-blue-600 hover:underline text-xs'>Github</a>
          </li>
        )}
        {project.url && (
          <li className='flex justify-between items-center text-sm'>
            <span className='flex gap-2 items-center font-medium text-xs'><Link2 className='size-4' /> Website</span>
            <a target="_blank" href={project.url} className='text-blue-600 hover:underline text-xs'>Project URL</a>
          </li>
        )}

        <li className='flex justify-between items-center text-sm'>
          <span className='flex gap-2 items-center font-medium text-xs'><Clock className='size-4' /> Created In</span>
          <span className='text-xs text-gray-500'>{diffForHuman(project.createdAt)}</span>
        </li>

        <li className='flex justify-between items-center pb-0 text-sm'>
          <span className='flex gap-2 items-center font-medium text-xs'><Clock className='size-4' /> Last Update In</span>
          <span className='text-xs text-gray-500'>{diffForHuman(project.updatedAt)}</span>
        </li>

        <Separator className='my-2 mt-4' />

        {isStatsLoading ? 
          <OnlySpinner /> 
        :(
          <div className='grid grid-flow-row gap-1'> 
            <li className='flex justify-between items-center py-2 pb-0 text-sm'>
              <span className='flex gap-2 items-center font-medium text-xs'>Total Boards</span>
              <span className='text-xs text-gray-500'>{stats?.stats?._count.projectBoards} boards</span>
            </li>

            <li className='flex justify-between items-center py-2 pb-0 text-sm'>
            <span className='flex gap-2 items-center font-medium text-xs'>Total Tasks</span>
              <span className='text-xs text-gray-500'>{stats?.stats?._count.projectTasks} tasks</span>
            </li>

            <li className='py-2 pb-0 text-sm flex flex-col items-center gap-1'>
              <div className='text-xs text-gray-500 flex gap-0.5'> 
                <Badge variant='outlineSuccess'>{stats?.acceptedTasks} accepted</Badge>
                <Badge variant='outlineWarning'>{stats?.pendingTasks} pending</Badge>
                <Badge variant='outlineDanger'>{stats?.refusedTasks} refused</Badge>
              </div>
            </li>
          </div>
        )}

      </ul>
      
      <Separator className='my-2 mt-4' />
      
      <ProjectActionsButtons className='xl:grid-cols-3' showAddBoard={false} showAddTask={false} project={project} />

    </div>
  );
}