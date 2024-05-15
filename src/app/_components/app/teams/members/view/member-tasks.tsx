"use client";

import React, { FormEvent } from "react";

import { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemberTasks } from "@/hooks/useMembers";

import { Search, X } from "lucide-react";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/empty-state";
import { LoadingSpinner } from "@/components/loading-spinner";
import { OneTask } from "../../../projects/tasks/task";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { TeamProject, TeamProjectTask } from "@/types";
import { Status } from "@prisma/client";

import { route } from "@/lib/route";

type Props = {
  projects: TeamProject[],
  teamId: number,
  memberId: number
}

export const MemberTasks = ({ projects, teamId, memberId }: Props) => {

  const searchParams = useSearchParams()

  const taskParam = searchParams.get('tasks') as Status
  const projectParam = Number(searchParams.get('project')) ?? projects[0]?.id
  const searchParam = searchParams.get('query') ?? ''

  const [selectedTasks, setSelectedTasks] = useState<Status>(taskParam ?? 'Pending')
  const [selectedProject, setSelectedProject] = useState<number>(projectParam)

  const searchRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const { tasks, tasksLoading, tasksRefetching, refetchTasks } = useMemberTasks(
    teamId, 
    memberId, 
    selectedTasks,
    searchRef.current?.value ?? searchParam,
    true,
    selectedProject,
  );

  const handleFilter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    refetchTasks()
    router.push(`?project=${selectedProject}&tasks=${selectedTasks}&query=${searchRef.current?.value}`)
  }
  
  const clearFilter = () => {
    router.push(route.viewTeamMember(teamId, memberId))
    refetchTasks()
  }

  useEffect(() => {
    refetchTasks()
  }, [selectedTasks, selectedProject, searchRef.current?.value, refetchTasks])

  return ( 
    <div>
      <Title label={`${selectedTasks} Tasks`} actionsClassName='w-[80%]'>
        <form onSubmit={handleFilter} className='w-full items-start flex gap-1'>
          <Input placeholder='Search for Task details' ref={searchRef} />

          <Select defaultValue={selectedTasks} onValueChange={(value: Status) => setSelectedTasks(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Tasks Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Status.Pending}>{Status.Pending}</SelectItem>
              <SelectItem value={Status.Accepted}>{Status.Accepted}</SelectItem>
              <SelectItem value={Status.Refused}>{Status.Refused}</SelectItem>
            </SelectContent>
          </Select>

          {projects.length > 0 && (
            <Select defaultValue={String(projects[0]?.id)} onValueChange={(value: string) => setSelectedProject(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Projects" />
              </SelectTrigger>
              <SelectContent>
                {projects.map(project => (
                  <SelectItem key={`project-idx-item-${project.id}`} value={String(project.id)}>{project.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Button type='submit' variant='outline' className='h-10 px-3'><Search className='size-4' /></Button>
          <Button type='button' onClick={clearFilter} variant='outline' className='h-10 px-3'><X className='size-4' /></Button>

        </form>

      </Title>
      
      {tasksRefetching || tasksLoading ? (
        <section className='mt-2'>
          <LoadingSpinner />
        </section>
      ): (
        <React.Fragment>
          {tasks?.length && tasks?.length > 0 ? (
            <section className="grid xl:grid-cols-3 grid-cols-1 mt-2 gap-2">
              {tasks?.map((task) => (
                <OneTask
                  key={`task-view-${task.id}`} 
                  task={task as unknown as TeamProjectTask}
                />
              ))}
            </section>
          ): (
            <EmptyState className="mt-2" title={`No ${selectedTasks} tasks`} />
          )}
        </React.Fragment>
      )}
    </div>
  );
}