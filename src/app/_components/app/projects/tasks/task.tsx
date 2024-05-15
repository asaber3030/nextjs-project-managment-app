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

type Props = { task: TeamProjectTask, teamId?: number }

export const OneTask = ({ task }: Props) => {

  const params: { teamId: string } = useParams()
  const taskURL = route.viewTeamTask(+params.teamId, task.id)

  return ( 
    <div className='bg-white rounded-sm shadow-sm p-4 relative border flex flex-col h-fit justify-between'>
      
      <Link href={taskURL} className='text-lg font-semibold hover:underline'>{task.title}</Link>
      <p className='text-sm italic text-gray-700 mt-2'>{task.description}</p>
      <Badge className='absolute top-2 right-2' variant={badgeVariant(task.status, true)}>{task.status}</Badge>

      <section className='my-4'>
        <h2 className='font-semibold text-sm'>Assigned to</h2>
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
        <Badge className='rounded-2xl font-normal text-xs' variant='secondary'>Recived an answer</Badge>
      </div>

      <TaskActions task={task} />
      
    </div>
  );
}