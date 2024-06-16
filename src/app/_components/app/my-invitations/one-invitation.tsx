"use client";

import { TeamInvite } from "@/types";

import { UserPlus } from "lucide-react";
import { RejectOneButton } from "./reject-button";
import { ApproveOneButton } from "./approve-button";

import { formatDate } from "@/lib/date";

type Props = { invitation: TeamInvite, showActions?: boolean }

export const OneInvitation = ({ invitation, showActions = true }: Props) => {

  return ( 
    <div className='p-4 rounded-md shadow-sm border bg-white relative'>
      <div className='flex gap-4'>
        <UserPlus className='size-7' />
        <div className='w-full'>
          <h1 className='text-sm font-medium flex items-center gap-3'><span>You have been invited to join team <b className='font-semibold'>&quot;{invitation.team?.name}&quot;</b></span></h1>
          <p className='text-xs text-gray-500'>Invited in <span className='font-semibold'>{formatDate(invitation.sentIn)}</span></p>
          {showActions && (
            <div className='flex gap-1 justify-end mt-4'>
              <RejectOneButton invitationId={invitation.id} />
              <ApproveOneButton invitationId={invitation.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}