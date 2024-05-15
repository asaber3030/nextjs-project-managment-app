"use client";

import { useMemberInvitations } from "@/hooks/useMembers";

import { LoadingButton } from "@/components/loading-button";
import { X } from "lucide-react";

type Props = {
  invitationIds: number[]  
}
export const RejectAllButton = ({ invitationIds }: Props) => {

  const { rejectAllIsPending, rejectAllMutate } = useMemberInvitations()

  const handleReject = () => {
    rejectAllMutate({
      invitationIds
    })
  }

  return ( 
    <LoadingButton onClick={handleReject} loading={rejectAllIsPending} variant='outline' size='sm'><X className='size-4' /> Reject All</LoadingButton>
  );
}