"use client";

import Link from "next/link";

import { Calendar, Github, Link2 } from "lucide-react";
import { ProjectActionsButtons } from "./project-actions-buttons";

import { diffForHuman } from "@/lib/date";
import { route } from "@/lib/route";
import { TeamProject } from "@/types";

type Props = { project: TeamProject }

export const ProjectCard = ({ project }: Props) => {

  return ( 
    <div key={`project-view-idx-${project.id}`} className='bg-white p-4 border rounded-md shadow-sm py-4 h-fit'>

      <Link href={route.viewTeamProject(project.teamId, project.id)} className='block mx-auto text-xl mb-1 font-bold'>{project.name}</Link>
      <p className='text-gray-500 text-xs mt-2'>{project.description}</p>

      <ul className="pt-2">
        {project.github && (
          <li className='flex justify-between items-center py-2 text-sm'>
            <span className='flex gap-2 items-center font-semibold text-xs'><Github className='size-4' /> Github Repo</span>
            <a target="_blank" href={project.github} className='text-blue-600 hover:underline text-xs'>{project.github}</a>
          </li>
        )}
        {project.url && (
          <li className='flex justify-between items-center py-2 text-sm'>
            <span className='flex gap-2 items-center font-semibold text-xs'><Link2 className='size-4' /> Website</span>
            <a target="_blank" href={project.url} className='text-blue-600 hover:underline text-xs'>{project.url}</a>
          </li>
        )}

        <li className='flex justify-between items-center py-2 text-sm'>
          <span className='flex gap-2 items-center font-semibold text-xs'><Calendar className='size-4' /> Created In</span>
          <span className='text-xs text-gray-500'>{diffForHuman(project.createdAt)}</span>
        </li>

        <li className='flex justify-between items-center py-2 pb-0 text-sm'>
          <span className='flex gap-2 items-center font-semibold text-xs'><Calendar className='size-4' /> Last Update In</span>
          <span className='text-xs text-gray-500'>{diffForHuman(project.updatedAt)}</span>
        </li>

      </ul>
      
      <ProjectActionsButtons className='xl:grid-cols-3' showAddBoard={false} showAddTask={false} project={project} />

    </div>
  );
}