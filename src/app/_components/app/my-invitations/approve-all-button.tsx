"use client";

import { LoadingButton } from "@/components/loading-button";
import { useMemberInvitations } from "@/hooks/useMembers";
import { Check } from "lucide-react";

type Props = {
  invitationIds: number[]
}
export const ApproveAllButton = ({ invitationIds }: Props) => {
  const { approveAllIsPending, approveAllMutate } = useMemberInvitations()

  const handleApprove = () => {
    approveAllMutate({
      invitationIds
    })
  }

  return ( 
    <LoadingButton onClick={handleApprove} loading={approveAllIsPending} variant='outline' size='sm'><Check className='size-4' /> Approve All</LoadingButton>
  );
}