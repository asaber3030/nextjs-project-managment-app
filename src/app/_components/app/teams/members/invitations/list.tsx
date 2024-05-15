"use client";

import { useTeam } from "@/hooks/useTeams";

import { Team } from "@/types";

import { Title } from "@/components/title";
import { DirectAddMemberButton } from "../direct-add-button";
import { InviteButton } from "../invite-button";
import { Invitation } from "./invitation";
import { LoadingSpinner } from "@/components/loading-spinner";
import { EmptyState } from "@/components/empty-state";

type Props = { team: Team }

export const TeamInvitations = ({ team }: Props) => {

  const { invitations, invitationsLoading } = useTeam(team.id)

  return ( 
    <section>
      <Title label="Invitations" hasBottomBorder parentClassName='mb-2'>
        <InviteButton team={team} />
        <DirectAddMemberButton team={team} />
      </Title>
      {invitationsLoading ? (
        <LoadingSpinner />
      ): invitations?.length === 0 ? (
        <EmptyState title='No Pending Invitations' imageSrc="/defaults/pending.svg" />
      ): (
        <section className='grid xl:grid-cols-4 gap-2'>
          {invitations?.map((invitation) => (
            <Invitation 
              key={`invitation-idx-key-${invitation.id}`} 
              invitation={invitation} 
            />
          ))}
        </section>
      )}
    </section>
  );
}