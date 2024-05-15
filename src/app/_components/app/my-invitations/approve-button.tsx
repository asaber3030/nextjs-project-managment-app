
import { LoadingButton } from "@/components/loading-button";
import { useMemberInvitations } from "@/hooks/useMembers";
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
    <LoadingButton loading={approveIsPending} onClick={handleApprove} variant='outline'><Check className='size-4' /> Approve</LoadingButton>
  );
}