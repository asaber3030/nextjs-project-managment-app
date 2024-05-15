import { getMyInvitationsToTeams } from "@/actions/user-data";

import { Title } from "@/components/title";

import { ApproveAllButton } from "@/app/_components/app/my-invitations/approve-all-button";
import { ListAllInvitations } from "@/app/_components/app/my-invitations/list";
import { RejectAllButton } from "@/app/_components/app/my-invitations/reject-all-button";

const InvitationsPage = async () => {
  
  const invitations = await getMyInvitationsToTeams()
  const invitationIds = invitations?.map(invitation => invitation.id)

  return ( 
    <div>
      <Title label="My Invitations to teams">
        {invitations.length > 0 && (
          <>
            <ApproveAllButton invitationIds={invitationIds} />
            <RejectAllButton invitationIds={invitationIds} />
          </>
        )}
      </Title>
      <ListAllInvitations invitations={invitations} />
    </div>
  );
}

export default InvitationsPage