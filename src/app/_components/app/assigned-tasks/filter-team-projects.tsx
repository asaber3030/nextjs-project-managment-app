"use client";

import { TeamProject } from "@/types";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { route } from "@/lib/route";

type Props = {
  projects: TeamProject[]
}

export const FilterTeamProjects = ({ projects }: Props) => {

  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedProject, setSelectedProject] = useState(searchParams.get('projectId') ?? '')
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') ?? '')

  const onProjectChange = (value: string) => {
    setSelectedProject(value)
    let queryParam = `projectId=${value}`
    if (selectedStatus && !!selectedStatus && selectedStatus != ' ') queryParam += `&status=${selectedStatus}`
    router.push(`?${queryParam}`)
  }

  const onStatusChange = (value: string) => {
    if (value === 'no-project') {
      router.push('?')
      return
    }
    setSelectedStatus(value)
    let queryParam = `status=${value}`
    if (selectedProject) queryParam += `&projectId=${selectedProject}`
    router.push(`?${queryParam}`)
  }


  console.log({ selectedProject, selectedStatus })

  return ( 
    <div className='flex gap-1'>
      <Select defaultValue={selectedProject} onValueChange={onProjectChange}>
        <SelectTrigger className='w-[250px]'>
          <SelectValue placeholder="Select a project" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={'no-project'}>No Project</SelectItem>
          {projects.map(project => (
            <SelectItem key={`select-item-${project.id}`} value={`${project.id}`}>{project.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select defaultValue={selectedStatus} onValueChange={onStatusChange}>
        <SelectTrigger className='w-[250px]'>
          <SelectValue placeholder="Task" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={' '}>No Status</SelectItem>
          <SelectItem value={'Pending'}>Pending</SelectItem>
          <SelectItem value={'Refused'}>Refused</SelectItem>
          <SelectItem value={'Accepted'}>Accepted</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}