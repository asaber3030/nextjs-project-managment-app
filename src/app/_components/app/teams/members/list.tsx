"use client";

import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { useMembers } from "@/hooks/useMembers";

import { Team } from "@/types";

import { UserPlus } from "lucide-react";
import { Member } from "./member";
import { InviteButton } from "./invite-button";
import { DirectAddMemberButton } from "./direct-add-button";
import { TeamMemberSkeleton } from "@/app/_components/skeleton/team-member-skeleton";
import { EmptyState } from "@/components/empty-state";
import React from "react";

type Props = { team: Team }

export const ListTeamMembers = ({ team }: Props) => {

  const { members, isMembersLoading } = useMembers(team.id);

  return ( 
    <div>
      <Title label={`Team Members`} hasBottomBorder parentClassName='mb-2'>
        <InviteButton team={team} />
        <DirectAddMemberButton team={team} />
      </Title>
    
      {isMembersLoading ? (
        <section className='grid gap-2 xl:grid-cols-4 grid-cols-1'>
          <TeamMemberSkeleton />
          <TeamMemberSkeleton />
          <TeamMemberSkeleton />
          <TeamMemberSkeleton />
        </section>
      ): (
        <React.Fragment>
          {members?.length && members?.length === 0 ? (
            <EmptyState title="No Members have been added." />
          ): (
            <section className='grid gap-2 xl:grid-cols-3 grid-cols-1'>
              {members?.map(member => (
                <Member key={`member-idx-list-view-${member.id}`} member={member} />
              ))}
            </section>
          )}
        </React.Fragment>
      )}
    </div>
  );  
}