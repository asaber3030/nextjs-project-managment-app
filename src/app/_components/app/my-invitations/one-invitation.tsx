"use client";

import { TeamInvite } from "@/types";
import { UserPlus } from "lucide-react";
import { RejectOneButton } from "./reject-button";
import { ApproveOneButton } from "./approve-button";
import { formatDate } from "@/lib/date";
import { UserHoverCard } from "../../user/hover-card";
import { route } from "@/lib/route";

type Props = { invitation: TeamInvite, showActions?: boolean }

export const OneInvitation = ({ invitation, showActions = true }: Props) => {

  return ( 
    <div className='p-4 rounded-md shadow-sm border bg-secondary relative'>
      <div className='flex gap-4'>
        <UserPlus className='size-7' />
        <div>
          <h1 className='text-sm font-medium flex items-center gap-3'><span>You have been invited to join team <b className='font-semibold'>{invitation.team?.name}</b></span></h1>
          <p className='text-xs text-gray-500'>Invited {formatDate(invitation.sentIn)}</p>
          {showActions && (
            <div className='flex gap-1 justify-end mt-4'>
              <RejectOneButton invitationId={invitation.id} />
              <ApproveOneButton invitationId={invitation.id} />
            </div>
          )}
        </div>
      </div>
      
      {invitation.team?.owner && (
        <div className='flex gap-2 mt-4'>
          <UserHoverCard user={invitation.team?.owner} date={invitation.sentIn} />
          <div>
            <h2 className='text-gray-500'>{invitation.team?.owner.name}</h2>
            <p className='text-gray-400 text-xs'>{invitation.team?.owner.jobTitle}</p>
          </div>
        </div>
      )}
      <p className='absolute right-1 bottom-1 text-sm font-medium'>{invitation.status}</p>
    </div>
  );
}