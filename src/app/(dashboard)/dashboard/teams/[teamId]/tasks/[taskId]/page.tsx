import db from "@/services/prisma"

import Link from "next/link"

import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import { userSelect } from "@/actions/config"
import { getTeam } from "@/actions/user-data"
import { isMemberOfTeam } from "@/actions/check"
import { authOptions } from "@/services/auth"
import { badgeVariant } from "@/lib/utils"

import { TeamProjectTask, TeamTaskReply, User } from "@/types"

import { AddTaskReply } from "@/app/_components/app/projects/tasks/add-task-reply"
import { AssignTaskAction } from "@/app/_components/app/projects/tasks/assign-task"
import { DeleteTaskAction } from "@/app/_components/app/projects/tasks/delete-task"
import { OneTask } from "@/app/_components/app/projects/tasks/task"
import { TaskReply } from "@/app/_components/app/projects/tasks/task-reply"
import { UpdateTaskAction } from "@/app/_components/app/projects/tasks/update-task"
import { UserHoverCard } from "@/app/_components/user/hover-card"
import { EmptyData } from "@/components/empty-data"
import { Title } from "@/components/title"
import { Badge } from "@/components/ui/badge"
import { route } from "@/lib/route"

type Props = {
  params: { 
    teamId: string
    taskId: string 
  }
}

const TaskID = async ({ params }: Props) => {

  const teamId = +params.teamId
  const taskId = +params.taskId

  const team = await getTeam(teamId)
  const current = await getServerSession(authOptions)
  const isMember = await isMemberOfTeam(+params.teamId)

  const task = await db.teamProjectTasks.findUnique({
    where: { id: taskId },
    include: { project: { include: { team: true } }, user: { select: userSelect } }
  }) as TeamProjectTask

  const replies = await db.teamTaskReply.findMany({
    where: { taskId },
    include: { user: { select: userSelect } },
    orderBy: { id: 'desc' }
  })

  if (!isMember) return notFound();

  if (!task || !team || !task.project) return notFound()
  if (team.id !== task.project.teamId) return notFound()
  if (team.ownerId !== current?.user.id) return notFound()
  
  return (
    <div>
      <Title label={<p>Task - <b className='font-bold'>{task?.title}</b></p>} hasBottomBorder parentClassName="mb-4">
        <Badge variant={badgeVariant(task.status)}>{task?.status}</Badge>
      </Title>
      
      <div className="grid xl:grid-cols-8 grid-cols-1 gap-3">
        <div className="col-span-5 divide-y">
          <section className='pt-0 py-4'>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Assigned To</h2>
            <div className='flex items-center gap-4'>
              <UserHoverCard user={task.user as User} date={task.createdAt} label="Task sent in" userURL={route.viewTeamMember(teamId, task.user.id)} />
              <div>
                <Link href="" className='text-sm font-medium text-gray-600'>{task.user.displayName ?? task.user.name}</Link>
                <p className='text-xs text-gray-400 font-normal'>@{task.user.username}</p>
              </div>
            </div>
          </section>

          <section className='py-4'>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Available Actions</h2>
            <div className='flex flex-wrap gap-1'>
              <AssignTaskAction task={task} label="Reassign Task" className='w-fit flex gap-4 h-9 bg-white border transition-all hover:bg-border px-4 text-sm font-medium rounded-md items-center' />
              <UpdateTaskAction task={task} label="Update Task" className='w-fit flex gap-4 h-9 bg-white border transition-all hover:bg-border px-4 text-sm font-medium rounded-md items-center' />
              <DeleteTaskAction task={task} label="Delete Task" className='w-fit flex gap-4 h-9 bg-white border transition-all hover:bg-border px-4 text-sm font-medium rounded-md items-center' />
            </div>
          </section>

          <section className='py-4'>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Replies</h2>
            
            {replies.length === 0 && (
              <EmptyData title="No Replies for this task." />
            )}

            <AddTaskReply task={task} />

            <div className='divide-y'>
              {replies.map((reply) => (
                <TaskReply key={`task-relpy-${reply.id}`} reply={reply as TeamTaskReply} />
              ))}
            </div>

          </section>

        </div>

        <div className="col-span-3">

          <h2 className="text-lg font-semibold text-gray-800 mb-2">Task Card</h2>

          <OneTask
            teamId={teamId}
            key={`task-team-${task.id}`}
            task={task as TeamProjectTask} 
          />

        </div>

      </div>

    </div>
  );
}
 
export default TaskID;