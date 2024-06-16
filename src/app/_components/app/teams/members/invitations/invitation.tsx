"use client";

import { useState } from "react";
import { useUser } from "@/hooks";
import { useRole } from "@/hooks/useRoles";
import { useTeam } from "@/hooks/useTeams";
import { useParams } from "next/navigation";

import { X } from "lucide-react";
import { UserHoverCard } from "@/app/_components/user/hover-card";
import { LoadingButton } from "@/components/loading-button";
import { NoPermissionAlert } from "@/components/no-permissions-alert";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { TeamInvite, User } from "@/types";

type Props = { invitation: TeamInvite }

export const Invitation = ({ invitation }: Props) => {

  const [modal, setModal] = useState(false)

  const { removeInvitationLoading, removeInvitationMutate } = useTeam(invitation.teamId)
  const { teamId }: { teamId: string } = useParams()
  const { team } = useTeam(Number(teamId))

  const role = useRole('members', 'remove-invitations', Number(teamId))
  const current = useUser()

  const handleDeleteInvite = () => {
    setModal(false)
    removeInvitationMutate({ invitationId: invitation.id })
  }

  return ( 
    <div className='border shadow-sm justify-between rounded-md flex gap-2 items-center p-4 bg-white'>
      <section className='flex items-center gap-2'>
        <UserHoverCard user={invitation.user as User} date={invitation.sentIn} />
        <section>
          <h3 className='font-semibold'>{invitation?.user?.name}</h3>
          <p className='text-xs'>@{invitation?.user?.jobTitle}</p>
        </section>
      </section>
      <section>
        <Dialog open={modal} onOpenChange={setModal}>
          <DialogTrigger className='size-7 rounded-full flex items-center justify-center border hover:bg-border transition-all'><X className='size-4' /></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Invitation - <b className='font-medium'>{invitation?.user?.name}</b></DialogTitle>
              <DialogDescription>Are you sure that you want to delete this invitation?</DialogDescription>
            </DialogHeader>
            {(role.access || team?.ownerId === current?.id) ? (
              <DialogFooter>
                <DialogClose className='border h-9 px-2 rounded-md hover:bg-secondary'>Cancel</DialogClose>
                <LoadingButton size='sm' onClick={handleDeleteInvite} loading={removeInvitationLoading} variant='secondaryMain'>Confirm</LoadingButton>
              </DialogFooter>
            ): (
              <NoPermissionAlert actionName="Remove Invitations" />
            )}
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}