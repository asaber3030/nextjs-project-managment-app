"use client";
import moment from "moment";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, CalendarIcon } from "lucide-react";

import { TeamMember, TeamProject } from "@/types";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

import { route } from "@/lib/route";
import { cn } from "@/lib/utils"
import { format } from "date-fns"
 
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
  members: TeamMember[],
  projects: TeamProject[]
}

export const SearchTeamTasks = ({ projects, members }: Props) => {

  const searchParams = useSearchParams()
  const params: { teamId: string } = useParams()
  const router = useRouter()

  const userIdParam = searchParams.get('userId')
  const projectIdParam = searchParams.get('projectId')
  const finishAtParam = format(searchParams.get('finishAt') || moment.now(), 'yyyy-MM-dd') as unknown as Date
  const statusParam = searchParams.get('status')

  const [userId, setUserId] = useState(userIdParam ?? '')
  const [projectId, setProjectId] = useState(projectIdParam ?? '')
  const [finishAt, setFinishAt] = useState<Date>(finishAtParam)
  const [status, setStatus] = useState(statusParam ?? '')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(`?userId=${userId}&projectId=${projectId}&finishAt=${finishAt ? format(finishAt, "yyyy-MM-dd") : ''}&status=${status}`)
  }

  const clearFilters = () => {
    router.push(route.viewTeamTasks(+params.teamId))
  }

  return ( 
    <form className='flex flex-wrap gap-1' onSubmit={onSubmit}>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !finishAt && "text-muted-foreground"
            )}
          >
            {finishAt ? (
              format(finishAt, "yyyy-MM-dd")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={finishAt}
            onSelect={(value) => setFinishAt(value as Date)}
          />
        </PopoverContent>
      </Popover>

      <Select defaultValue={status ?? ' '} onValueChange={(value) => setStatus(value)}>

        <SelectTrigger className='w-[150px]'>
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value={` `}>No Status</SelectItem>
          <SelectItem value={`Pending`}>Pending</SelectItem>
          <SelectItem value={`Accepted`}>Accepted</SelectItem>
          <SelectItem value={`Refused`}>Refused</SelectItem>
        </SelectContent>

      </Select>

      <Select defaultValue={userId ?? ''} onValueChange={(value) => setUserId(value)}>

        <SelectTrigger className='w-[200px]'>
          <SelectValue placeholder="Member" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value={` `}>No User</SelectItem>
          {members.map((member) => (
            <SelectItem key={`select-member-idx-${member.id}`} value={`${member.userId}`}>
              <p className='flex gap-2 items-center'>
                <span>{member.user.name}</span>
                <span className='text-xs text-gray-500'>@{member.user.username}</span>
              </p>
            </SelectItem>
          ))}
        </SelectContent>

      </Select>

      <Select defaultValue={projectId ?? ''} onValueChange={(value) => setProjectId(value)}>

        <SelectTrigger className='w-[200px]'>
          <SelectValue placeholder="Project" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value={` `}>No Project</SelectItem>
          {projects.map((project) => (
            <SelectItem key={`select-project-idx-${project.id}`} value={`${project.id}`}>
              <p className='flex gap-2 items-center'>
                <span>{project.name}</span>
                <span className='text-xs text-gray-500'>#{project.id}</span>
              </p>
            </SelectItem>
          ))}
        </SelectContent>

        </Select>
      
      <Button className='xl:w-fit md:w-fit w-full h-10' type='submit' variant='outline' size='sm'><Search className='size-4 text-secondaryMain' /></Button>
      <Button className='xl:w-fit md:w-fit w-full h-10' type='button' onClick={clearFilters} variant='outline' size='sm'>Clear</Button>

    </form>
  );
}