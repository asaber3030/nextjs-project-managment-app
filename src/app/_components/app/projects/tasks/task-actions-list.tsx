"use client";

import { TeamProjectTask } from "@/types";

import { UpdateTaskAction } from "./update-task";
import { DeleteTaskAction } from "./delete-task";
import { SendWarningTaskAction } from "./send-warning-task";
import { AssignTaskAction } from "./assign-task";
import { useUser } from "@/hooks";
import { useRole } from "@/hooks/useRoles";
import { useParams } from "next/navigation";
import { useTeam } from "@/hooks/useTeams";
import { Render } from "@/components/render";
import { ButtonSkeleton } from "@/app/_components/skeleton/button-skeleton";

type Props = { 
  task: TeamProjectTask
}

export const TaskActions = ({ task }: Props) => {

  const { teamId: stringId }: { teamId: string } = useParams()

  const teamId = Number(stringId)
  const user = useUser()

  const roleUpdateTask = useRole('tasks', 'update-tasks', teamId)
  const roleDeleteTask = useRole('tasks', 'delete-tasks', teamId)
  const roleAssignTask = useRole('tasks', 'assign-tasks', teamId)

  const { team } = useTeam(teamId)

  return ( 
    <div className='flex gap-0.5'>
      <Render 
        access={roleUpdateTask.access || user?.id === team?.ownerId}
        fetched={roleUpdateTask.roleFetched}
        loading={roleUpdateTask.roleLoading}
        render={<UpdateTaskAction task={task} />}
        renderSkeleton={<ButtonSkeleton className='w-[50px]' />}
      />

      <Render 
        access={roleDeleteTask.access || user?.id === team?.ownerId}
        fetched={roleDeleteTask.roleFetched}
        loading={roleDeleteTask.roleLoading}
        render={<DeleteTaskAction task={task} />}
        renderSkeleton={<ButtonSkeleton className='w-[50px]' />}
      />

      <Render 
        access={roleAssignTask.access || user?.id === team?.ownerId}
        fetched={roleAssignTask.roleFetched}
        loading={roleAssignTask.roleLoading}
        render={<AssignTaskAction task={task} />}
        renderSkeleton={<ButtonSkeleton className='w-[50px]' />}
      />
    </div>
  );
}