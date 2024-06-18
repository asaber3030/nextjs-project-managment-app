import React from "react";

import { useMembers } from "@/hooks/useMembers";
import { useState } from "react";
import { useRole } from "@/hooks/useRoles";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogClose, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { OnlySpinner } from "@/components/loading-spinner";

import { TeamMember } from "@/types";
import { useUser } from "@/hooks";
import { useTeam } from "@/hooks/useTeams";
import { NoPermissionAlert } from "@/components/no-permissions-alert";

type Props = { member: TeamMember }

export const RemoveMemberAction = ({ member }: Props) => {

  const [modal, setModal] = useState(false)

  const { deletionMutate, deletionPending } = useMembers(member.teamId)
  const { team } = useTeam(member.teamId)
  
  const user = useUser()

  const confirmDeletion = () => {
    deletionMutate({
      memberId: member?.userId,
      membershipId: member?.id
    })
  }
  
  const roleRemoveMembers = useRole('members', 'delete-members', member.teamId)

  return ( 
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger className='w-full'>
        <Button className='w-full min-w-full justify-start bg-transparent hover:bg-secondary text-black'>Remove Member</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='mt-4'>
          <DialogTitle className='mb-4'>Are you sure that you want to remove this member from this team?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the team member
            and remove his data from our team.
          </DialogDescription>
        </DialogHeader>
        
        {roleRemoveMembers.roleLoading ? (
          <OnlySpinner />
        ): (
          <React.Fragment>
            {(roleRemoveMembers.access || team?.ownerId === user?.id) ? (
              <DialogFooter>
              <Button onClick={() => setModal(false)} variant='outline' size='sm'>Close</Button>
              <DialogClose><Button onClick={confirmDeletion} disabled={deletionPending} variant='destructive' size='sm'>Confirm</Button></DialogClose>
            </DialogFooter>
            ): (
              <NoPermissionAlert />
            )}
          </React.Fragment>
        )}
        
      </DialogContent>
    </Dialog>
  );
} 