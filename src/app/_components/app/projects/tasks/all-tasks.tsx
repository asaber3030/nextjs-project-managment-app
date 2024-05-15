"use client";

import React from "react";

import { TeamProject } from "@/types";

import { useTasks } from "@/hooks/useTasks";

import { TaskSkeleton } from "@/app/_components/skeleton/task-skeleton";
import { EmptyData } from "@/components/empty-data";
import { OneTask } from "./task";
import { ProjectHeaderTitle } from "../project-header-title";
import { AddTaskAction } from "./add-task";

type Props = { project: TeamProject }

export const AllProjectTasks = ({ project }: Props) => {

  const { tasks, isTasksLoading } = useTasks(project.teamId, project.id)

  return (
    <div>

      <ProjectHeaderTitle project={project} />

      <section>

        <h1 className='text-xl font-semibold mb-2'>Project Tasks</h1>

        {isTasksLoading ? (
          <TaskSkeleton repeat={3} />
        ): (
          <React.Fragment>
            {tasks.length > 0 ? (
              <div className='grid lg:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-2'>
                {tasks?.map(task => (
                  <OneTask task={task as any} key={`task-view-idx-${task.id}`} />
                ))}
              </div>
            ): (
              <React.Fragment>
                <EmptyData label="No tasks">
                  <AddTaskAction className="p-1 px-4" project={project} projectId={project.id} />
                </EmptyData>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </section>
      
    </div>
  );
}
