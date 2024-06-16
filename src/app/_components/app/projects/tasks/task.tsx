"use client";

import Link from "next/link";

import { UserHoverCard } from "@/app/_components/user/hover-card";
import { Badge } from "@/components/ui/badge";
import { TaskActions } from "./task-actions-list";

import { badgeVariant } from "@/lib/utils";
import { formatDate } from "@/lib/date";
import { route } from "@/lib/route";

import { TeamProjectTask } from "@/types";

import { useParams } from "next/navigation";
import { useProject } from "@/hooks/useProjects";
import { useTeam } from "@/hooks/useTeams";

type Props = { task: TeamProjectTask, teamId?: number }

export const OneTask = ({ task }: Props) => {

  const params: { teamId: string } = useParams()

  const { project } = useProject(task.projectId);
  const { team } = useTeam(project?.teamId)

  const taskURL = route.viewTeamTask(team?.id as number, task.id)

  return ( 
    <div className='bg-white rounded-sm shadow-sm p-4 pb-8 relative border h-fit justify-between overflow-hidden text-ellipsis'>
      
      <div>
        <h2 className='text-lg font-medium flex gap-1 items-center'>
          <Link href={taskURL} className='hover:underline'>
            {task.title}
          </Link>
        </h2>
        <p className='text-sm italic text-gray-700 mt-2 w-[95%] overflow-clip line-clamp-4'>{task.description}</p>
      </div>

      <Badge className='absolute bottom-4 right-4' variant={badgeVariant(task.status, true)}>{task.status}</Badge>

      <section className='my-4'>
        <h2 className='font-medium text-sm'>Assigned to</h2>
        <section className='flex gap-4 items-center p-2 border rounded-sm'>
          <UserHoverCard user={task.user} date={task.createdAt} label="Task sent" userURL={route.viewTeamMember(+params.teamId, task.user.id)} />
          <div>
            <Link className='font-medium hover:underline text-sm' href={route.viewTeamTask(+params.teamId, task.id)}>{task.user.name}</Link>
            <p className='text-xs text-gray-500'>{task.user.jobTitle}</p>
          </div>
        </section>
      </section>

      <div className='grid gap-1 mb-4'>
        <Badge className='rounded-2xl font-normal text-xs' variant='secondary'>Task assigned {formatDate(task.createdAt)}</Badge>
        <Badge className='rounded-2xl font-normal text-xs' variant='secondary'>Must Finish {formatDate(task.finishAt)}</Badge>
        {task.url && (
          <Badge className='rounded-2xl font-normal text-xs' variant='secondary'><a className='hover:underline' target='_blank' href={task.url}>{task.url}</a></Badge>
        )}
      </div>

      <TaskActions task={task} />
      
    </div>
  );
}