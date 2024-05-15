"use client";

import Link from "next/link";

import { Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserHoverCard } from "../../user/hover-card";
import { DirectAddMemberButton } from "./members/direct-add-button";
import { InviteButton } from "./members/invite-button";

import { Team, User } from "@/types";

import { route } from "@/lib/route";

type Props = { team: Team, teamId: number }

export const OneTeam = ({ team, teamId }: Props) => {

  return ( 
    <div className='rounded-md shadow-sm border p-4 h-fit flex flex-col justify-between gap-4 bg-white'>

      <section className="flex items-center justify-between">

        <Link href={route.viewTeam(team.id)} className='bg-gray text-xl font-medium'>{team?.name}</Link>
        
        <div className='flex gap-1 flex-wrap'>
          <Link href={route.viewTeamSettings(team.id)}><Button size='sm' className='h-8 hover:bg-grayMain' variant='ghost'><Cog className='size-4' /></Button></Link>
          <InviteButton label="" team={team as unknown as Team} />
        </div>

      </section>

      {team?.members?.length && team?.members.length > 0 ? (

        <section>

          <section className='flex flex-wrap'>
            {team?.members.slice(0, 7).map((member, idx) => (
              <UserHoverCard 
                userURL={route.viewTeamMember(member.teamId, member.userId)}
                key={`user-hovercard-view-team-${idx}`} 
                date={member.joinedIn} 
                user={member.user as User} 
              />
            ))}
          </section>
          
          <div className='flex gap-1 mt-4 justify-end'>
            <DirectAddMemberButton team={team} />
            <InviteButton label="Invite" team={team} />
          </div>
          
        </section>
        
      ): (
        <div className='flex gap-1 justify-end'>
          <DirectAddMemberButton team={team} />
          <InviteButton label="Invite" team={team} />
        </div>
      )}
    </div>
  );
}