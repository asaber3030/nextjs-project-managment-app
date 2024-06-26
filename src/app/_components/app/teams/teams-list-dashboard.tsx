"use client"

import { useSession } from "next-auth/react";
import { useTeams } from "@/hooks/useTeams";

import { Team } from "@prisma/client";

import { CreateTeamButton } from "./create-team-button";
import { TeamSkeleton } from "../../skeleton/team-skeleton";
import { OneTeam } from "./team";
import { Title } from "@/components/title";

export const TeamsListDashboard = () => {

  const { data: current } = useSession()
  
  const { teams, teamsStillLoading } = useTeams(String(current?.user?.id))

  if (teams?.length === 0) {
    return (
      <Title label='My Teams' parentClassName="mb-4">
        <CreateTeamButton label='Create Team' />
      </Title>
    )
  }

  return ( 
    <div className='pl-4'>

      <Title label='My Teams' parentClassName="mb-4">
        <CreateTeamButton label='Create Team' />
      </Title>

      {teamsStillLoading && <TeamSkeleton repeat={4} />}

      <div className='grid grid-cols-1 xl:grid-cols-4 gap-2'>
      
        {teams?.map((team: Team) => (
          <OneTeam 
            teamId={team.id} 
            team={team} 
            key={`team-data-idx-${team.id}`} 
          />
        ))}

      </div>

    </div>
  );
}

TeamsListDashboard.displayName = "TeamsListDashboard";
