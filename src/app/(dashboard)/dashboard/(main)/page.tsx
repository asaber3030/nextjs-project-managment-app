import Link from "next/link";

import { getMyJoinedTeams, getPersonalProjects, getTeams } from "@/actions/user-data";
import { route } from "@/lib/route";

import { Cog, Folder, Plus, UserPlus, Users } from "lucide-react";
import { OneTeam } from "@/app/_components/app/teams/team";
import { CreateTeamButton } from "@/app/_components/app/teams/create-team-button";
import { OnePersonalProject } from "@/app/_components/app/personal/projects/one-project";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/title";
import { EmptyData } from "@/components/empty-data";
import { EmptyState } from "@/components/empty-state";

import { Team } from "@/types";

const Home = async () => {

  const teams = await getTeams()
  const joinedTeams = await getMyJoinedTeams();
  const personalProjects = await getPersonalProjects()

  return (
    <div className='space-y-4'>

      {/* My teams */}
      <section>
        <Title parentClassName="mb-4" label='My Teams' icon={Users} labelClassName='font-normal'>
          <CreateTeamButton label='Create' iconClassName='size-3.5' className='px-3 py-0.5 text-xs h-7 rounded-sm gap-1' />
        </Title>

        {teams.length === 0 ? (
          <EmptyState title="No Created Teams." className='font-semibold' />
        ): (
          <div className='grid grid-cols-1 xl:grid-cols-4 gap-2'>
            {teams?.map((team) => (
              <OneTeam 
                key={`team-data-idx-${team.id}`} 
                team={team}
                teamId={team.id} 
              />
            ))}
          </div>
        )}
      </section>

      {/* Joined teams */}
      <section>
        
        <Title parentClassName="mb-4" label="Joined Teams" icon={UserPlus}>
          <Link href='/'><Button size='sm' variant='secondaryMain' className="px-3 py-0.5 text-xs h-7 rounded-sm gap-1"><Cog className='size-4' /> Settings</Button></Link>
        </Title>

        {joinedTeams.length === 0 ? (
          <EmptyData title="No Joined Teams!" />
        ): (
          <section className='grid xl:grid-cols-4 grid-cols-1 gap-2'>
            {joinedTeams.map((team)=> (
              <OneTeam
                key={`team-joined-data-idx-${team.id}`} 
                team={team.team as Team} 
                teamId={team.teamId} 
              />
            ))}
          </section>
        )}
      </section>

      {/* My Personal Projects */}
      <section>

        <Title parentClassName="mb-4" label="My Personal Projects" icon={Folder}>
          <Link href={route.createPersonalProject()}><Button variant='secondaryMain' className="px-3 py-0.5 text-xs h-7 rounded-sm gap-1"><Plus className='size-4' /> Create</Button></Link>
        </Title>

        {personalProjects.length === 0 ? (
          <EmptyState title="No Personal Projects Created." />
        ): (
          <div className='grid grid-cols-1 gap-2 xl:grid-cols-4'>
            {personalProjects.map((project) => (
              <OnePersonalProject
                project={project}
                projectId={project.id} 
                key={`idx-project-card-${project.id}`}
              />
            ))}
          </div>
        )}

      </section>

    </div>
  );
}
 
export default Home;