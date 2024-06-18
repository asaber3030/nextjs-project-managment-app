"use client";

import React from "react";
import Link from "next/link";

import { useProjects } from "@/hooks/useProjects";

import { route } from "@/lib/route";

import { Team } from "@/types";

import { FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/title";
import { EmptyState } from "@/components/empty-state";
import { ProjectSkeleton } from "../../skeleton/project-skeleton";
import { ProjectCard } from "../projects/project-card";
import { Render } from "@/components/render";
import { useUser } from "@/hooks/useUser";
import { useRole } from "@/hooks/useRoles";

type Props = { team: Team, teamId: number }

export const DisplayTeamProjects = ({ team, teamId }: Props) => {

  const { projects, isProjectsLoading } = useProjects(team.id)
  
  const user = useUser()
  const roleInviteMembers = useRole('projects', 'add-projects', teamId)

  return (
    <section>
      
      <Title disableIcon label='Projects' parentClassName='mb-2'>
        <Render 
          render={<Link href={route.addTeamProject(team.id)} className='flex items-center gap-2'><Button variant='outline'><FolderPlus className='size-3' /> Create Project</Button></Link>}
          fetched={roleInviteMembers.roleFetched}
          loading={roleInviteMembers.roleLoading}
          access={roleInviteMembers.access || user?.id === team?.ownerId}
        />
      </Title>

      {isProjectsLoading ? (
        <ProjectSkeleton repeat={3} />
      ): (
        <React.Fragment>
          {projects.length > 0 ? (
            <div className='grid xl:grid-cols-3 md:grid-cols-1 grid-cols-1 gap-2'>
              {projects.map(project => (
                <ProjectCard 
                  project={project} 
                  key={`project-view-idx-${project.id}`}
                />
              ))}
            </div>
          ): (
            <EmptyState title="No Projects Found!" />
          )}
        </React.Fragment>
      )}
    </section>
  );
}