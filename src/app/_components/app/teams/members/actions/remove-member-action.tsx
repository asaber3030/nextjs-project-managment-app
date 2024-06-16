import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogClose, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { TeamMember } from "@/types";

import { useMembers } from "@/hooks/useMembers";
import { useState } from "react";
import { useRole } from "@/hooks/useRoles";
import React from "react";
import { OnlySpinner } from "@/components/loading-spinner";

type Props = { member: TeamMember }

export const RemoveMemberAction = ({ member }: Props) => {

  const [modal, setModal] = useState(false)

  const { deletionMutate, deletionPending } = useMembers(member?.teamId)

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
            {roleRemoveMembers.access && (
              <DialogFooter>
              <Button onClick={() => setModal(false)} variant='outline' size='sm'>Close</Button>
              <DialogClose><Button onClick={confirmDeletion} disabled={deletionPending} variant='destructive' size='sm'>Confirm</Button></DialogClose>
            </DialogFooter>
            )}
          </React.Fragment>
        )}
        
      </DialogContent>
    </Dialog>
  );
} 