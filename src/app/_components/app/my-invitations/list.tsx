import React from "react";

import { TeamInvite } from "@/types";
import { OneInvitation } from "./one-invitation";
import { EmptyState } from "@/components/empty-state";

type Props = { invitations: TeamInvite[] }

export const ListAllInvitations = ({ invitations }: Props) => {

  return ( 
    <div className='mt-4'>
      {invitations.length > 0 ? (
        <div className='grid grid-cols-4 gap-2'>
          {invitations.map(invitation => (
            <OneInvitation invitation={invitation} key={`invitation-idx-${invitation.id}`} />
          ))}
        </div>
      ): (
        <EmptyState title="No Invitations!" />
      )}
    </div>
  );
}