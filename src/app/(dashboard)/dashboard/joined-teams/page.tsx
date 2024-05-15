import Link from "next/link";

import { getMyJoinedTeams } from "@/actions/user-data";

import { Cog } from "lucide-react";
import { OneTeam } from "@/app/_components/app/teams/team";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { Team } from "@/types";

const JoinedTeamsPage = async () => {
  
  const joinedTeams = await getMyJoinedTeams();

  return (
    <div>

      <Title label="Joined Teams" parentClassName="mb-2">
        <Link href='/'><Button size='sm' variant='secondaryMain'><Cog className='size-4' /> Settings</Button></Link>
      </Title>

      <section className='grid xl:grid-cols-4 grid-cols-1 gap-2'>
        {joinedTeams.map(team => (
          <OneTeam 
            key={`joined-team-idx-${team.id}`} 
            team={team.team as Team} 
            teamId={team.team.id} 
          />
        ))}
      </section>

    </div>
  );
}
 
export default JoinedTeamsPage;