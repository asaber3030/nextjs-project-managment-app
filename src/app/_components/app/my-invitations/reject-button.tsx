import { useMemberInvitations } from "@/hooks/useMembers";

import { LoadingButton } from "@/components/loading-button";
import { X } from "lucide-react";

type Props = {
  invitationId: number
}

export const RejectOneButton = ({ invitationId }: Props) => {

  const { rejectIsPending, rejectMutate } = useMemberInvitations()

  const handleReject = () => {
    rejectMutate({
      invitationId
    })
  }

  return ( 
    <LoadingButton loading={rejectIsPending} onClick={handleReject} variant='outline'><X className='size-4' /> Reject</LoadingButton>
  );
}