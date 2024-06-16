import Link from "next/link";

import { route } from "@/lib/route";
import { formatDate } from "@/lib/date";

import { TeamProjectTask } from "@/types";
import { EmptyData } from "@/components/empty-data";
import { UserHoverCard } from "../user/hover-card";

type Props = {
  tasks: TeamProjectTask[]
}

export const ListSearchedTeamTasks = ({ tasks }: Props) => {

  return tasks.length === 0 ? (
    <EmptyData title="No tasks result." />
  ): (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-2">
      {tasks.map(task => {
        return (
          <div key={`teams-task-searched-${task.id}`} className="bg-white rounded-sm p-4 shadow-sm border">
            <div className='mb-4'>
              <Link href={route.viewProjectTask(task.project?.teamId, task.project?.id, task.id)}  className='text-sm mb-4 block font-medium'>
                {task.title}
              </Link>
              <ul className='text-xs flex justify-between'>
                <li>Created in {formatDate(task.createdAt)}</li>
                <li>Updated in {formatDate(task.updatedAt)}</li>
              </ul>
            </div>

            <div className='flex gap-3 items-center'>
              <UserHoverCard user={task.user} date={task.createdAt} label="Task assigned in" />
              <div>
                <h3 className='text-sm'>{task.user.name}</h3>
                <p className='text-xs text-gray-400'>{task.user.jobTitle}</p>
              </div>
              
            </div>
          </div>
        )
      })}
    </div>
  )
}