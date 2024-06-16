"use client"

import React from "react"
import Link from "next/link"

import { Team, TeamProject, TeamMember } from "@/types"

import { Check, Dot } from "lucide-react"

import { usePathname, useSearchParams } from "next/navigation"

import { route } from "@/lib/route"
import { cn } from "@/lib/utils"
import { EmptyData } from "@/components/empty-data"

type Props = { joinedTeams: TeamMember[] }

export const AssignedTasksSidebar = ({ joinedTeams }: Props) => {

  const pathname = usePathname()
  const searchParams = useSearchParams()

  return ( 
    <div className='space-y-2 bg-white p-2 shadow-sm rounded-md border'>

      {joinedTeams.length === 0 && (
        <EmptyData title="No joined teams." />
      )}

      {joinedTeams.map(({ team }: { team: Team }) => (
      
        <div className='w-full' key={`sidebar-joined-team-${team.id}`}>
          <Link
            href={route.assignedTeamTasks(team.id)} 
            className={cn(
              'p-1 px-4 border bg-white rounded-md shadow-sm text-sm flex gap-1 items-center hover:bg-secondary transition-all hover:border-secondary',
              pathname?.includes(`teams/${team.id}`) && 'hover:bg-secondaryMain/10 hover:border-transparent bg-secondaryMain/10 border-transparent'
            )}
          >
            <span>Team</span>
            <Dot className='size-4' /> 
            <span className='font-medium'>{team.name}</span>
          </Link>
          
          {team?.teamProjects?.length === 0 && (
            <div className='bg-slate-200 p-1 px-4 mt-1 rounded-md text-sm font-medium shadow-sm'>No Projects created in this team.</div>
          )}

          <ul className='w-full mt-1 space-y-0.5'>
            {team?.teamProjects?.map((project: TeamProject) => (
              <li key={`list-item-project-${project.id}`}>
                <Link
                  href={route.assignedTeamTasksWithProject(team.id, project.id)} 
                  className={cn(
                    'p-1 text-xs relative transition-all border border-transparent hover:bg-secondaryMain/10 rounded-sm px-2 flex flex-col gap-0.5 py-2',
                    searchParams.get('projectId') == String(project.id) && 'bg-secondaryMain/10 border-secondaryMain/40'
                  )}
                >
                  <span>{project.name}</span>
                  <span className='font-medium text-yellow-900 leading-3'>{project?.projectTasks?.length} tasks assigned to you</span>

                  {searchParams.get('projectId') == String(project.id) && (
                    <Check className='size-4 text-secondaryMain/70 absolute right-2' />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

    </div>
  )
}