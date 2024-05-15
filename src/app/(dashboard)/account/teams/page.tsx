import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EmptyData } from "@/components/empty-data";
import { CreateTeamButton } from "@/app/_components/app/teams/create-team-button";
import { AccountHeaderMain } from "@/app/_components/account/title-section";
import { DeleteAllTeamsButton } from "@/app/_components/account/teams/delete-all-button";
import { LeaveAllTeamsButton } from "@/app/_components/account/teams/leave-all";
import { LeaveOneTeamButton } from "@/app/_components/account/teams/leave-one";

import { Team } from "@/types";

import { route } from "@/lib/route";
import { getCurrent, getMyJoinedTeams, getTeams } from "@/actions/user-data";
import { diffForHuman } from "@/lib/date";

const MyTeamsPage = async () => {

  const current = await getCurrent();
  const teams = await getTeams(String(current?.id));

  const joinedTeamsList = await getMyJoinedTeams();
  const joinedTeams = joinedTeamsList.map((joined) => joined.team)

  return (
    <div>

      <AccountHeaderMain title="My Teams" className='mb-4' />
      
      <div className='space-y-1'>
        
        {teams?.length == 0 && (
          <EmptyData title="No Teams Created" />
        )}
        
        {teams?.map((team: Team) => (
          <div className='flex justify-between items-center border rounded-md p-1 px-4' key={`team-idx-list-acc-${team.id}`}>
            <h1 className='flex-1 font-medium'>{team?.name}</h1>
            <div className='flex-1 flex gap-3'>
              <p className='text-xs text-gray-400'>{team?.members?.length} members</p>
            </div>
            <div className='space-x-1'>
              <Link href={route.viewTeam(team.id)}><Button variant='link'>View Team</Button></Link>
              <Link href={route.deleteTeam(team.id)}><Button variant='link'>Delete</Button></Link>
              <Link href={route.viewTeamSettings(team.id)}><Button variant='link'>Settings</Button></Link>
            </div>
          </div>
        ))}

      </div>

      <div className='mt-4 flex gap-1 justify-end'>
        <CreateTeamButton label="Create" />
        <DeleteAllTeamsButton teams={teams} />
      </div>

      <Separator className='mt-4' />

      <AccountHeaderMain title="Joined Teams" label="" className='my-4' />

      <div className='space-y-1'>
        
        {joinedTeams?.length == 0 && (
          <EmptyData title="No Teams Joined" />
        )}

        {joinedTeamsList?.map(
          ({ joinedIn, team, id }) => (
            <div className='flex justify-between items-center border rounded-md p-1 px-4' key={`team-idx-list-acc-${team.id}`}>
              <h1 className='flex-1 font-medium'>{team?.name}</h1>
              <div className='flex-1 flex gap-3'>
                <p className='text-xs text-gray-400'>{diffForHuman(joinedIn)}</p>
              </div>
              <div className='flex gap-1'>
                <Button variant='link'><Link href={route.viewTeam(team.id)}>View</Link></Button>
                <LeaveOneTeamButton teamId={team.id} membershipId={id} /> 
              </div>
            </div>
          ))}
      </div>

      <div className='mt-4 flex gap-1 justify-end'>
        <LeaveAllTeamsButton teams={joinedTeams as Team[]} />
      </div>

    </div>
  );
}
 
export default MyTeamsPage;