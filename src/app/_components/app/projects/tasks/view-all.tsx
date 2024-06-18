"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Status } from "@prisma/client";
import { TTasksFilters, TeamProject, TeamProjectTask } from "@/types";
import { searchProjectTasks } from "@/actions/project";
import { format } from "date-fns";
import { QueryKeys } from "@/lib/query-keys";

import { TaskSkeleton } from "@/app/_components/skeleton/task-skeleton";
import { EmptyData } from "@/components/empty-data";
import { OneTask } from "./task";
import { AddTaskAction } from "./add-task";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button";

type Props = { project: TeamProject }

export const ViewAllTasks = ({ project }: Props) => {

  const router = useRouter()
  const searchParams = useSearchParams()

  const userParam: string = searchParams.get('user') as string
  const statusParam: Status = searchParams.get('status') as Status
  const dateParam: Date = searchParams.get('date') as any as Date

  const [filters, setFilters] = useState<TTasksFilters>({
    user: userParam ?? '',
    status: statusParam ?? '',
    date: dateParam ?? ''
  })

  const queryTasks = useQuery({
    queryKey: QueryKeys.teamProjectTasks(project.teamId, project.id),
    queryFn: () => searchProjectTasks(project.id, filters),
  })
  
  const tasks = queryTasks.data?.tasks as unknown as TeamProjectTask[]

  const submitFilter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    queryTasks.refetch()
    router.push(`?user=${filters.user}&` + `status=${filters.status}&` + `date=${filters.date}`)
  }

  return (
    <section>

      <section className='flex justify-between pb-2 border-b mb-2'>
        <h1 className='text-xl font-medium'><b className='text-main capitalize'>{project.name}</b> - Project Tasks</h1>
        <AddTaskAction project={project} projectId={project.id} className='p-1 px-4' />
      </section>

      {/* Filters */}
      <section className='mb-4'>
        
        <form onSubmit={submitFilter} className='grid xl:grid-cols-8 gap-2'>
          
          <div className='col-span-3'>
            <Label>Search for a specific user</Label>
            <Input 
              name="user"
              className='h-9'
              value={filters.user}
              placeholder='@username, example@mail.com, John Cena' 
              onChange={(event: ChangeEvent<HTMLInputElement>) => setFilters(filters => ({ ...filters, user: event.target.value }))}
            />
          </div>

          <div className='col-span-2 flex flex-col mt-1'>
            <Label className='mb-1'>Filter with finish date</Label>
            <DatePicker 
              date={filters.date as any}
              setDate={(date: Date) => setFilters(old => ({ ...old, date: format(date, "yyyy-MM-dd") }))}
            />
          </div>

          <div className='col-span-2 flex flex-col mt-1'>
            <Label className='mb-1'>Status</Label>
            <Select value={filters.status} onValueChange={(value: Status) => setFilters(filters => ({ ...filters, status: value }))}>
              <SelectTrigger className='h-9'>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={'All'}>All</SelectItem>
                <SelectItem value={Status.Pending}>{Status.Pending}</SelectItem>
                <SelectItem value={Status.Accepted}>{Status.Accepted}</SelectItem>
                <SelectItem value={Status.Refused}>{Status.Refused}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='mt-5 col-span-1'>
            <Button className='h-9 w-full' type='submit' variant='secondaryMain'>Filter</Button>
          </div>
        </form>

      </section>

      <h1 className='text-xl mb-1'>Tasks</h1>

      {queryTasks.isLoading || queryTasks.isRefetching ? (
        <TaskSkeleton repeat={3} />
      ): (
        <React.Fragment>
          {tasks?.length > 0 ? (
            <div className='grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-2'>
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
  );
}

ViewAllTasks.displayName = "ViewAllTasks";