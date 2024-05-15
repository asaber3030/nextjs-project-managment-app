import Link from "next/link";

import { getMyJoinedTeams, getPersonalProjects, getTeams } from "@/actions/user-data";

import { Cog } from "lucide-react";
import { OneTeam } from "@/app/_components/app/teams/team";
import { CreateTeamButton } from "@/app/_components/app/teams/create-team-button";
import { OnePersonalProject } from "@/app/_components/app/personal/projects/one-project";
import { EmptyData } from "@/components/empty-data";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";

import { Team } from "@/types";
import { route } from "@/lib/route";

const Home = async () => {

  const joinedTeams = await getMyJoinedTeams();
  const teams = await getTeams()
  const personalProjects = await getPersonalProjects()

  return (
    <div className='space-y-4'>

      <Title label='My Teams' parentClassName="mb-4">
        <CreateTeamButton label='Create Team' />
      </Title>

      {teams.length === 0 && (
        <EmptyData title="No Created Teams." />
      )}

      <div className='grid grid-cols-1 xl:grid-cols-4 gap-2'>
        {teams?.map((team) => (
          <OneTeam 
            key={`team-data-idx-${team.id}`} 
            team={team}
            teamId={team.id} 
          />
        ))}
      </div>
      
      <div>
        
        <Title label="Joined Teams" parentClassName="mb-2">
          <Link href='/'><Button size='sm' variant='secondaryMain'><Cog className='size-4' /> Settings</Button></Link>
        </Title>

        {joinedTeams.length === 0 && (
          <EmptyData title="No Joined Teams!" />
        )}

        <section className='grid xl:grid-cols-4 grid-cols-1 gap-2'>
          {joinedTeams.map((team)=> (
            <OneTeam
              key={`team-joined-data-idx-${team.id}`} 
              team={team.team as Team} 
              teamId={team.teamId} 
            />
          ))}
        </section>

      </div>

      <Title label="My Personal Projects" parentClassName="mb-2">
        <Link href={route.createPersonalProject()}><Button variant='secondaryMain'>Create Project</Button></Link>
      </Title>
      <div className='grid grid-cols-1 gap-2 xl:grid-cols-4'>
        {personalProjects.map((project) => (
          <OnePersonalProject 
            key={`idx-project-card-${project.id}`}
            project={project}
            projectId={project.id} 
          />
        ))}
      </div>

    </div>
  );
}
 
export default Home;