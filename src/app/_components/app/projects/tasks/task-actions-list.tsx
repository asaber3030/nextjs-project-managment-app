"use client";

import { useUser } from "@/hooks";
import { useRole } from "@/hooks/useRoles";
import { useParams } from "next/navigation";
import { useTeam } from "@/hooks/useTeams";
import { useProject } from "@/hooks/useProjects";

import { TeamProjectTask } from "@/types";

import { ButtonSkeleton } from "@/app/_components/skeleton/button-skeleton";
import { Render } from "@/components/render";
import { UpdateTaskAction } from "./update-task";
import { DeleteTaskAction } from "./delete-task";
import { AssignTaskAction } from "./assign-task";

type Props = { 
  task: TeamProjectTask
}

export const TaskActions = ({ task }: Props) => {

  const user = useUser()

  const { project } = useProject(task.projectId);
  const { team } = useTeam(project?.teamId)

  const roleUpdateTask = useRole('tasks', 'update-tasks', team?.id as number)
  const roleDeleteTask = useRole('tasks', 'delete-tasks', team?.id as number)
  const roleAssignTask = useRole('tasks', 'assign-tasks', team?.id as number)

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