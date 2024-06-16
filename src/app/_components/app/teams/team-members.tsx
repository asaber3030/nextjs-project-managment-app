"use client";

import Link from "next/link";

import { Team, TeamMember } from "@/types";

import { route } from "@/lib/route";
import { useTeam } from "@/hooks/useTeams";

import { Users } from "lucide-react";
import { EmptyData } from "@/components/empty-data";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { UserHoverCard } from "../../user/hover-card";
import { InviteButton } from "./members/invite-button";
import { useRole } from "@/hooks/useRoles";
import { Render } from "@/components/render";
import { useUser } from "@/hooks";

type Props = { members: TeamMember[], teamId: number }

export const DisplayTeamMembers = ({ members, teamId }: Props) => {

  if (members.length === 0) {
    return (
      <section>
        <Title label='Team Members' parentClassName='mb-2' />
        <EmptyData className='mt-2' label='No team members added!' />
      </section>
    )
  }

  return (
    <section>
      <Title disableIcon label='Team Members' parentClassName='mb-2'>
        <Link href={route.viewTeamMembers(members[0].teamId)}><Button variant='outline'><Users className='size-3' /> View All</Button></Link>
      </Title>
      <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3 gap-1">
        {members.map((member) => (
          <div key={`idx-member-${member.id}`} className='bg-white flex items-center border p-4 rounded-sm shadow-sm gap-3 hover:bg-border transition-all cursor-pointer select-none'>
            <UserHoverCard user={member.user} date={member.joinedIn} userURL={route.viewTeamMember(member.teamId, member.userId)} />
            <div>
              <h1>{member.user.name}</h1>
              <p className='text-xs text-gray-500'>{member.user.jobTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}