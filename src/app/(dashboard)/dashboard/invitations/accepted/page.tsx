import { getMyInvitationsToTeams } from "@/actions/user-data";

import { OneInvitation } from "@/app/_components/app/my-invitations/one-invitation";
import { EmptyState } from "@/components/empty-state";
import { Title } from "@/components/title";
import { Status } from "@prisma/client";

const AcceptedInvitationsPage = async () => {
  
  const invitations = await getMyInvitationsToTeams(Status.Accepted)

  return ( 
    <div>
      <Title label="Accepted Invitations" parentClassName="mb-4" />
      {invitations.length > 0 ? (
        <div className='grid grid-cols-4 gap-2'>
          {invitations.map(invitation => (
            <OneInvitation 
              showActions={false} 
              invitation={invitation} 
              key={`invitation-accepted-idx-${invitation.id}`} 
            />
          ))}
        </div>
      ): (
        <EmptyState title="No Accepted Invitations!" />
      )}
    </div>
  );
}

export default AcceptedInvitationsPage