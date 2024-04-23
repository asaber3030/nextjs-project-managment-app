"use client"

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { getTeams } from "@/actions/user-data";

import { Plus, Users } from "lucide-react";
import { TeamSkeleton } from "../../skeleton/team-skeleton";
import { Button } from "@/components/ui/button";
import { Team } from "@prisma/client";
import { OneTeam } from "./one-team";
import { CreateTeamButton } from "./create-team-button";
import { QueryKeys } from "@/lib/query-keys";

export const TeamsListDashboard = () => {

  const { data: current } = useSession()
  
  const query = useQuery({
    queryKey: QueryKeys.userTeams(),
    queryFn: () => getTeams(current?.user?.id as any),
    gcTime: 10
  })

  const teams: (Team[] | undefined) = query?.data

  if (query.isLoading) return <TeamSkeleton />

  if (teams?.length === 0) return <TeamsListDashboard.EmptyTeams />

  return ( 
    <div className='pl-4'>
      <header className='flex justify-between'>
        <h1 className='text-2xl font-bold mb-4 flex gap-4 items-center'><Users className='size-7' /> My Teams</h1>
        <CreateTeamButton>
          <Button size='sm' variant='outline'><Plus className='size-4' /> Create Team</Button>
        </CreateTeamButton>
      </header>

      <div className='grid grid-cols-1 xl:grid-cols-4 gap-2'>
        {teams?.map((team: Team) => (
          <OneTeam key={`team-data-idx-${team.id}`} teamId={team.id} />
        ))}
      </div>
    </div>
  );
}

TeamsListDashboard.EmptyTeams = () => {
  return (
    <div>
      <h1>No Teams</h1>
    </div>
  )
}