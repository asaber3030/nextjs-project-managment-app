"use client"

import React from "react"

import { Team, TeamMember, TeamProject } from "@/types"

import Link from "next/link"

import { Check, Dot } from "lucide-react"
import { cn } from "@/lib/utils"
import { route } from "@/lib/route"
import { usePathname, useSearchParams } from "next/navigation"


type Props = { joinedTeams: any }

export const AssignedTasksSidebar = ({ joinedTeams }: Props) => {

  const pathname = usePathname()
  const searchParams = useSearchParams()

  return ( 
    <div className='space-y-2'>
      {joinedTeams.map(({ team }: { team: Team }) => (
        <div className='w-full' key={`sidebar-joined-team-${team.id}`}>
          <Link
            href={route.assignedTeamTasks(team.id)} 
            className={cn(
              'p-1 px-4 border bg-white rounded-md shadow-sm text-sm flex gap-1 items-center',
              pathname?.includes(`teams/${team.id}`) && 'border-secondaryMain bg-secondaryMain text-white'
            )}
          >
            <span>Team</span>
            <Dot className='size-4' /> 
            <span className='font-semibold'>{team.name}</span>
          </Link>
          
          {team?.teamProjects?.length === 0 && (
            <div className='bg-slate-200 p-2 mt-1 rounded-md text-sm font-medium text-center shadow-sm'>No Projects created in this team.</div>
          )}

          <ul className='w-full space-y-1 mt-1 px-6'>
            {team?.teamProjects?.map((project: TeamProject) => (
              <li key={`list-item-project-${project.id}`}>
                <Link
                  href={route.assignedTeamTasksWithProject(team.id, project.id)} 
                  className={cn(
                    'p-1 text-xs transition-all hover:bg-secondaryMain/40 rounded-sm px-2 flex gap-1 items-center',
                    searchParams.get('projectId') == String(project.id) && 'bg-secondaryMain/40'
                  )}
                >
                  <span>{project.name}</span>
                  <Dot className='size-4' />
                  <span className='font-medium text-yellow-700'>{project?.projectTasks?.length} tasks assigned to you</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}