import { useMemberInvitations } from "@/hooks/useMembers";

import { LoadingButton } from "@/components/loading-button";
import { Check } from "lucide-react";

type Props = {
  invitationId: number
}

export const ApproveOneButton = ({ invitationId }: Props) => {

  const { approveIsPending, approveMutate } = useMemberInvitations()

  const handleApprove = () => {
    approveMutate({
      invitationId
    })
  }

  return ( 
    <LoadingButton loading={approveIsPending} onClick={handleApprove} variant='success' className='px-4 h-8'><Check className='size-4' /> Approve</LoadingButton>
  );
}