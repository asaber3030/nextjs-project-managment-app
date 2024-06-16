import Link from "next/link";

import { getTeamProjects } from "@/actions/team";
import { getCurrent, getTeam } from "@/actions/user-data";
import { isMemberOfTeam } from "@/actions/check";
import { route } from "@/lib/route";
import { notFound } from "next/navigation";

import { Plus } from "lucide-react";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { EmptyData } from "@/components/empty-data";
import { ProjectCard } from "@/app/_components/app/projects/project-card";

import { TeamProject } from "@/types";
import { SearchProjectsInput } from "@/app/_components/app/projects/search-project";

type Props = {
  params: { teamId: string },
  searchParams: { projectName?: string }
}

const TeamProjectsPage = async ({ params, searchParams }: Props) => {

  const teamProjects = await getTeamProjects(Number(params.teamId), searchParams.projectName)
  const team = await getTeam(Number(params.teamId))
  const isMember = await isMemberOfTeam(+params.teamId)
  const current = await getCurrent()
  
  if (!team) return notFound()
  if ((!isMember && current?.id != team.ownerId)) return notFound();

  return (
    <div>
      <Title disableIcon label={`Team ${team?.name} Projects`} parentClassName='mb-2'>
        <Link href={route.addTeamProject(Number(params.teamId))}><Button variant='outline' className='px-4 text-sm'><Plus className='size-4' /> Create</Button></Link>
        <SearchProjectsInput />
      </Title>

      {teamProjects.data.length === 0 && (
        <EmptyData title="No Projects have been created." />
      )}

      <section className='grid xl:grid-cols-3 grid-cols-1 gap-2'>
        {teamProjects.data.map((project: TeamProject) => (
          <ProjectCard
            key={`project-team-idx-${project.id}`}
            project={project} 
          />
        ))}
      </section>
    </div>
  );
}
 
export default TeamProjectsPage;