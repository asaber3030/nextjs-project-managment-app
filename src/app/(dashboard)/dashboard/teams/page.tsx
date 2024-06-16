import db from "@/services/prisma";

import { getCurrent, getCurrentPlan } from "@/actions/user-data";
import { notFound } from "next/navigation";
import { Title } from "@/components/title";
import { virtualInfinityNumber } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { CreateTeamButton } from "@/app/_components/app/teams/create-team-button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/empty-state";
import { OneTeam } from "@/app/_components/app/teams/team";
import { Team } from "@/types";
import { SearchTeamsInput } from "@/app/_components/app/teams/search-teams";
import { SearchJoinedTeamsInput } from "@/app/_components/app/teams/search-joined-teams";
import { Separator } from "@/components/ui/separator";

type Props = {
  searchParams: {
    name?: string,
    joinedTeam?: string
  }
}

const TeamsPage = async ({ searchParams }: Props) => {

  const nameParam = searchParams.name ?? ''
  const joinedTeamParam = searchParams.joinedTeam ?? ''

  const current = await getCurrent()
  const plan = await getCurrentPlan()
  
  if (!current) return notFound()
  if (!plan) return notFound()

  const teams = await db.team.findMany({
    where: { 
      ownerId: current.id, 
      name: { contains: nameParam }
    },
    include: { members: { take: 7, include: { user: true } } }
  })

  const joinedTeams = await db.teamMember.findMany({
    where: { 
      userId: current.id,
      team: { name: joinedTeamParam }
    },
    include: { team: { include: { members: { take: 7, include: { user: true } } } } }
  })


  const remainingTeams = plan?.numberOfTeams === virtualInfinityNumber ? '∞' : plan?.numberOfTeams - teams.length

  return (
    <div>
      <Title label="Created Teams">
        <div className="flex gap-2 items-center mr-4">
          <h4>Remaining teams</h4>
          <ArrowRight className='size-4' />
          <p className='text-teal-700 font-semibold'>
            {remainingTeams} teams
          </p>
        </div>
        {remainingTeams !== 0 && (
          <CreateTeamButton label="Create a new team" />
        )}
      </Title>

      <section className='mt-4'>
        
        <div className='flex mb-4'>
          <SearchTeamsInput />
        </div>

        {teams.length === 0 ? (
          <EmptyState title={searchParams.name ? 'No results.' : 'No teams created.'} />
        ): (
          <div className='grid grid-cols-1 xl:grid-cols-4 gap-2'>
            {teams.map((team) => (
              <OneTeam key={`teams-page-idx-${team.id}`} team={team as unknown as Team} />
            ))}
          </div>
        )}
      </section>

      <Separator className='my-4' />

      <Title label="Joined Teams">
        <SearchJoinedTeamsInput />
      </Title>

      <section className='mt-4'>

        {joinedTeams.length === 0 ? (
          <EmptyState title={searchParams.joinedTeam ? 'No results.' : 'No teams joined.'} />
        ): (
          <div className='grid grid-cols-1 xl:grid-cols-4 gap-2'>
            {joinedTeams.map(({ team }) => (
              <OneTeam key={`joined-teams-page-idx-${team.id}`} team={team as unknown as Team} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
 
export default TeamsPage;