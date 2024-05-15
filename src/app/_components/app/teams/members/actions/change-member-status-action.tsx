import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { TeamMember } from "@/types";
import { TeamMemberStatus } from "@prisma/client";

import { useMembers } from "@/hooks/useMembers";
import { useState } from "react";

type Props = { member: TeamMember }

export const ChangeMemberStatusAction = ({ member }: Props) => {

  const [modal, setModal] = useState(false)
  const [newStatus, setNewStatus] = useState(member.status)

  const { changeStatusMutate, changeStatusPending } = useMembers(member?.teamId)

  const confirmChange = () => {
    changeStatusMutate({
      memberId: member?.userId,
      membershipId: member?.id,
      status: newStatus
    })
  }

  return ( 
    <Dialog>
      <DialogTrigger className='w-full'>
        <Button className='w-full min-w-full justify-start bg-transparent hover:bg-secondary text-black'>Change status</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Changing Member Status - <b>{member.user.name}</b></DialogTitle>
          <DialogDescription>
            You can change member status only to <b>{TeamMemberStatus.Active} / {TeamMemberStatus.Banned}</b>
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2">
          <Switch defaultChecked={newStatus === TeamMemberStatus.Active} id="airplane-mode" onCheckedChange={(checked) => setNewStatus(checked ? TeamMemberStatus.Active : TeamMemberStatus.Banned)} />
          <Label htmlFor="airplane-mode">User Status</Label>
        </div>

        <DialogFooter>
          <Button onClick={() => setModal(false)} variant='outline' size='sm'>Close</Button>
          <DialogClose><Button onClick={confirmChange} disabled={changeStatusPending} variant='secondaryMain' size='sm'>Confirm</Button></DialogClose>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}