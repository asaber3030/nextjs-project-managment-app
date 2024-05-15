"use client";

import Link from "next/link";

import { usePersonalProject } from "@/hooks/usePersonal";
import { diffForHuman } from "@/lib/date";
import { Calendar, Github, Link2 } from "lucide-react";
import { PersonalProjectActions } from "./actions";
import { Project } from "@/types";

type Props = { projectId: number, project: Project }

export const OnePersonalProject = ({ project, projectId }: Props) => {

  if (!project) return null

  return (

    <div key={`project-view-idx-${project.id}`} className='p-4 border rounded-md shadow-sm py-4 h-fit bg-white'>

      <Link href={''} className='block mx-auto text-xl mb-1 font-bold text-center'>{project.name}</Link>
      <p className='text-gray-500 text-xs mt-2 text-center'>{project.description}</p>

      <ul className="pt-2">
        {project.github && (
          <li className='flex justify-between items-center py-2 text-sm'>
            <span className='flex gap-2 items-center font-semibold text-xs'><Github className='size-4' /> Github Repo</span>
            <a target="_blank" href={project.github} className='text-blue-600 hover:underline text-xs'>URL</a>
          </li>
        )}
        {project.url && (
          <li className='flex justify-between items-center py-2 text-sm'>
            <span className='flex gap-2 items-center font-semibold text-xs'><Link2 className='size-4' /> Website</span>
            <a target="_blank" href={project.url} className='text-blue-600 hover:underline text-xs'>URL</a>
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

      <PersonalProjectActions project={project} />
      
    </div>
  );
}