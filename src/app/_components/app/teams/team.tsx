"use client";

import Link from "next/link";

import { useSession } from "next-auth/react";

import { Cog, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserHoverCard } from "../../user/hover-card";
import { DirectAddMemberButton } from "./members/direct-add-button";
import { InviteButton } from "./members/invite-button";

import { Team, User } from "@/types";

import { route } from "@/lib/route";

type Props = { team: Team, teamId?: number }

export const OneTeam = ({ team }: Props) => {

  const current = useSession()

  return ( 
    <div className='rounded-md shadow-sm border p-4 h-fit flex flex-col justify-between gap-2 bg-white'>

      <section className="flex items-center justify-between">

        <Link href={route.viewTeam(team.id)} className='bg-gray text-lg font-medium'>{team.name}</Link>
        
        <div className='flex gap-1 flex-wrap'>
          <Link href={route.viewTeamSettings(team.id)}><Button size='sm' className='h-8 hover:bg-grayMain' variant='ghost'><Cog className='size-4' /></Button></Link>
          <InviteButton label="" team={team} />
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
                className={current.data?.user.id == member?.user?.id && 'border-2 border-green-600'}
              />
            ))}
          </section>
          
          <div className='flex gap-1 mt-4 justify-end'>
            <DirectAddMemberButton team={team} />
            <InviteButton label="Invite" team={team} />
          </div>
          
        </section>
        
      ): (
        <section>

          <p className='flex gap-2 items-center font-normal text-xs mb-4 text-gray-500'><Users className='size-3' /> No members added or joined this team.</p>

          <div className='flex gap-1'>
            <DirectAddMemberButton team={team} />
            <InviteButton label="Invite" team={team} />
          </div>

        </section>
      )}
    </div>
  );
}