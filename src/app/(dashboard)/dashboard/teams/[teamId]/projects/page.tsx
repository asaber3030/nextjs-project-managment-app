import Link from "next/link";

import { getTeamProjects } from "@/actions/team";
import { getTeam } from "@/actions/user-data";
import { route } from "@/lib/route";

import { ProjectCard } from "@/app/_components/app/projects/project-card";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { TeamProject } from "@/types";
import { EmptyData } from "@/components/empty-data";
import { isMemberOfTeam } from "@/actions/check";
import { notFound } from "next/navigation";

type Props = {
  params: { teamId: string }
}

const TeamProjectsPage = async ({ params }: Props) => {

  const teamProjects = await getTeamProjects(Number(params.teamId))
  const team = await getTeam(Number(params.teamId))
  const isMember = await isMemberOfTeam(+params.teamId)
  
  if (!isMember) return notFound();

  return (
    <div>
      <Title label={`Team ${team?.name} Projects`} parentClassName='mb-2'>
        <Button variant='outline'><Link href={route.addTeamProject(Number(params.teamId))}>Create new project</Link></Button>
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