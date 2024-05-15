"use client";

import Link from "next/link";

import { usePersonalProjects } from "@/hooks/usePersonal";

import { Title } from "@/components/title";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { ProjectSkeleton } from "@/app/_components/skeleton/project-skeleton";
import { OnePersonalProject } from "./one-project";

import { route } from "@/lib/route";

export const ListPersonalProjects = () => {

  const { projects, projectsLoading } = usePersonalProjects()

  if (projectsLoading) {
    return (
      <div>
        <Title label="My Personal Projects" parentClassName="mb-2">
          <Link href={route.createPersonalProject()}><Button variant='secondaryMain'>Create Project</Button></Link>
        </Title>
        <ProjectSkeleton repeat={3} />
      </div>
    )
  }
  if (!projects || projects.length === 0) {
    return (
      <div>
        <Title label="My Personal Projects" parentClassName="mb-2">
          <Link href={route.createPersonalProject()}><Button variant='secondaryMain'>Create Project</Button></Link>
        </Title>
        <EmptyState title="No Personal Projects has been added!" />
      </div>
    )
  }

  return ( 
    <div>
      <Title label="My Personal Projects" parentClassName="mb-2">
        <Link href={route.createPersonalProject()}><Button variant='secondaryMain'>Create Project</Button></Link>
      </Title>
      <div className='grid grid-cols-1 gap-2 xl:grid-cols-4'>
        {projects.map((project) => (
          <OnePersonalProject 
            key={`idx-project-card-${project.id}`}
            projectId={project.id}
            project={project}
          />
        ))}      
      </div>
    </div>
  );
}

ListPersonalProjects.displayName = "ListPersonalProjects";