"use client";

import { getTeamProjects } from "@/actions/team";
import { QueryKeys } from "@/lib/query-keys";
import { Team } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { ProjectSkeleton } from "../../skeleton/project-skeleton";
import { TeamProject } from "@prisma/client";
import Link from "next/link";
import { route } from "@/lib/route";
import { Calendar, Github, Link2, Plus } from "lucide-react";
import { diffForHuman } from "@/lib/date";
import { useUser } from "@/hooks";
import { Button } from "@/components/ui/button";

type Props = { team: Team }

export const DisplayTeamProjects = ({ team }: Props) => {

  const user = useUser()
  
  const queryProjects = useQuery({
    queryKey: QueryKeys.teamProjects(team.id),
    queryFn: () => getTeamProjects(team.id)
  })

  console.log(user)

  const projects: TeamProject[] = queryProjects.data?.data

  if (queryProjects.isLoading) return <DisplayTeamProjects.Loading />

  if (projects?.length === 0) return <DisplayTeamProjects.Empty teamId={team.id} />

  return (
    <section>
      <section className='flex justify-between items-center'>
        <h1 className='text-xl font-semibold mb-2'>Projects</h1>
        <Link href={route.addTeamProject(team.id)} className='flex items-center gap-2'><Plus className='size-3' /> Add Project</Link>
      </section>
      
      <div className='grid xl:grid-cols-3 grid-cols-1 gap-2'>

        {projects.map(project => (
          
          <div key={`project-view-idx-${project.id}`} className='p-4 bg-gray-50 border rounded-md shadow-sm py-4 h-fit'>

            <Link href={route.viewTeamProject(team.id, project.id)} className='block mx-auto text-3xl mb-1 font-bold'>{project.name}</Link>
            <p className='text-gray-500 text-xs'>{project.description}</p>

            <ul className="divide-y pt-4">
              {project.github && (
                <li className='flex justify-between items-center py-2 text-sm'>
                  <span className='flex gap-2 items-center font-bold'><Github className='size-4' /> Github Repo</span>
                  <a target="_blank" href={project.github} className='text-blue-600 hover:underline text-xs'>{project.github}</a>
                </li>
              )}
              {project.url && (
                <li className='flex justify-between items-center py-2 text-sm'>
                  <span className='flex gap-2 items-center font-bold'><Link2 className='size-4' /> Website</span>
                  <a target="_blank" href={project.url} className='text-blue-600 hover:underline text-xs'>{project.url}</a>
                </li>
              )}

              <li className='flex justify-between items-center py-2 text-sm'>
                <span className='flex gap-2 items-center font-bold'><Calendar className='size-4' /> Created In</span>
                <span className='text-xs text-gray-500'>{diffForHuman(project.createdAt)}</span>
              </li>

              <li className='flex justify-between items-center py-2 text-sm'>
                <span className='flex gap-2 items-center font-bold'><Calendar className='size-4' /> Last Update In</span>
                <span className='text-xs text-gray-500'>{diffForHuman(project.updatedAt)}</span>
              </li>

            </ul>
            
            {project.ownerId === parseInt(user?.id as any as string) && (
              <div className='pt-4 border-t gap-1 grid xl:grid-cols-4 grid-cols-1'>
                <Link className='w-full' href={route.updateTeamProject(team.id, project.id)}><Button className='w-full' variant='outline'>Update</Button></Link>
                <Link className='w-full' href={route.deleteTeamProject(team.id, project.id)}><Button className='w-full' variant='outline'>Delete</Button></Link>
                <Link className='w-full' href={route.addTasksToTeamProject(team.id, project.id)}><Button className='w-full' variant='outline'>Add Tasks</Button></Link>
                <Link className='w-full' href={route.viewTasksOfTeamProject(team.id, project.id)}><Button className='w-full' variant='outline'>View Tasks</Button></Link>
              </div>
            )}
          </div>

        ))}
      </div>
    </section>
  );
}

DisplayTeamProjects.Loading = () => {
  return (
    <section>
      <h1 className='text-xl font-semibold mb-2'>Projects</h1>
      <ProjectSkeleton repeat={3} />
    </section>
  )
}

DisplayTeamProjects.Empty = ({ teamId }: { teamId: number }) => {
  return (
    <section>
      <h1 className='text-xl font-semibold mb-2'>Projects</h1>
      
      <div className='rounded-md shadow-sm bg-border text-sm p-2 px-4'>
        No projects found in this team. <Link href={route.addTeamProject(teamId)}></Link>
      </div>
    </section>
  )
}