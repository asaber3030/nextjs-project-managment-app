import Link from "next/link";
import React from "react";

import { Team } from "@/types/user";

import { CheckCheck, Folder, ListChecks, Users2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserHoverCard } from "../../user/hover-card";

type Props = {
  team: Team
}
export const DisplayTeamAnalytics = ({ team }: Props) => {

  return (
    <section>

      <h1 className='text-xl font-semibold'>Analytics</h1>

      <div className='mt-2 grid xl:grid-cols-4 gap-2'>

        <div className="flex flex-col text-center justify-center rounded-md p-2 border space-y-2">
          <Users2 className='mx-auto' />
          <span>Members</span> 
          <Badge className="w-full text-center mb-2" variant='outline'>{team.members.length} members</Badge>
          <Link className='w-full block' href={`/dashboard/teams/${team.id}/projects/create`}><Button className='w-full' variant='secondary'>Invite</Button></Link>
        </div>

        <div className="flex flex-col text-center justify-center rounded-md p-2 border space-y-2">
          <ListChecks className='mx-auto' />
          <span>Tasks</span> 
          <Badge className="w-full text-center mb-2" variant='outline'>1 tasks</Badge>
          <Link className='w-full block' href={`/dashboard/teams/${team.id}/projects/create`}><Button className='w-full' variant='secondary'>Create</Button></Link>
        </div>
        
        <div className="flex flex-col text-center justify-center rounded-md p-2 border space-y-2">
          <Folder className='mx-auto' />
          <span>Projects</span> 
          <Badge className="w-full text-center mb-2" variant='outline'>1 projects</Badge>
          <Link className='w-full block' href={`/dashboard/teams/${team.id}/projects/create`}><Button className='w-full' variant='secondary'>Create</Button></Link>
        </div>
       
        <div className="flex flex-col text-center justify-center rounded-md p-2 border space-y-2">
          <CheckCheck className='mx-auto' />
          <span>Invitations</span> 
          <Badge className="w-full text-center mb-2" variant='outline'>{team.invitations.length} invitations</Badge>
          <Link className='w-full block' href={`/dashboard/teams/${team.id}/projects/create`}><Button className='w-full' variant='secondary'>View</Button></Link>
        </div>

      </div>

      {team.invitations.length > 0 && (
        <React.Fragment>
          <h1 className='text-xl font-semibold mb-2 mt-4'>Pending Invitations</h1>
          <div className='flex flex-wrap my-4'>
            {team.invitations.map((invitation) => (
              <UserHoverCard user={invitation.user} date={invitation.joinedIn} label='Invited ' />
            ))}
          </div>
        </React.Fragment>
      )}
    </section>
  );
}