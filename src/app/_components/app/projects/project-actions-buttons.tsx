"use client";

import Link from 'next/link';

import { useUser } from '@/hooks';
import { useRole } from '@/hooks/useRoles';
import { route } from "@/lib/route";
import { cn } from '@/lib/utils';

import { TeamProject } from '@/types';

import { Button } from "@/components/ui/button";
import { Render } from '@/components/render';
import { AddTaskAction } from './tasks/add-task';
import { AddBoardAction } from './boards/add-board';
import { ButtonSkeleton } from '../../skeleton/button-skeleton';

type Props = { 
  project: TeamProject,
  showAddTask?: boolean,
  showAddBoard?: boolean,
  className?: string
}

export const ProjectActionsButtons = ({ className, showAddTask = true, showAddBoard = true, project }: Props) => {

  const user = useUser()

  const roleUpdateProject = useRole('projects', 'update-projects', project.teamId)
  const roleDeleteProject = useRole('projects', 'delete-projects', project.teamId)

  return ( 
    <div className={cn('flex gap-1 flex-wrap mt-2', className)}>
      
      <Link href={route.viewTasksOfTeamProject(project.teamId, project.id)}><Button variant='outline'>View Tasks</Button></Link>
      
      <Render 
        access={roleUpdateProject.access || user?.id === project?.team?.ownerId}
        fetched={roleUpdateProject.roleFetched}
        loading={roleUpdateProject.roleLoading}
        render={<Link href={route.updateTeamProject(project.teamId, project.id)}><Button variant='outline'>Update</Button></Link>}
        renderSkeleton={<ButtonSkeleton />}
      />

      <Render 
        access={roleUpdateProject.access || user?.id === project?.team?.ownerId}
        fetched={roleDeleteProject.roleFetched}
        loading={roleDeleteProject.roleLoading}
        render={<Link href={route.deleteTeamProject(project.teamId, project.id)}><Button variant='outline'>Delete</Button></Link>}
        renderSkeleton={<ButtonSkeleton />}
      />  

      {showAddTask && (
        <AddTaskAction className='w-fit' project={project} projectId={project.id} />
      )}
      {showAddBoard && (
        <AddBoardAction className='w-fit' project={project} />
      )}
      
    </div>
  );
}