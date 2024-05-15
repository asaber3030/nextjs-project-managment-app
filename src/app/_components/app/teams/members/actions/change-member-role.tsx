import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { TeamMember } from "@/types";
import { TeamMemberStatus, TeamRoles } from "@prisma/client";

import { useMembers } from "@/hooks/useMembers";
import { useState } from "react";
import { PermissionsMutatorsArray } from "@/lib/permission";

type Props = { member: TeamMember }

export const ChangeMemberRoleAction = ({ member }: Props) => {

  const [modal, setModal] = useState(false)
  const [newRole, setNewRole] = useState(member.role)

  const { changeRoleMutate, changeRolePending } = useMembers(member?.teamId)

  const confirmChange = () => {
    changeRoleMutate({
      memberId: member?.userId,
      membershipId: member?.id,
      role: newRole
    })
  }

  return ( 
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger className='w-full'>
        <Button className='w-full min-w-full justify-start bg-transparent hover:bg-secondary text-black'>Change Role</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Changing Member Status - <b>{member.user.name}</b></DialogTitle>
          <DialogDescription>
            You can change member status only to <b>{TeamMemberStatus.Active} / {TeamMemberStatus.Banned}</b>
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2">
          <Select value={newRole} onValueChange={(role: TeamRoles) => setNewRole(role)}>
            <SelectTrigger>
              <SelectValue placeholder={"Choose Role"} />
            </SelectTrigger>
            <SelectContent>
              {PermissionsMutatorsArray.map(mu => <SelectItem key={`key-${mu}`} value={mu}>{mu}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button onClick={() => setModal(false)} variant='outline' size='sm'>Close</Button>
          <DialogClose><Button onClick={confirmChange} disabled={changeRolePending} variant='secondaryMain' size='sm'>Confirm</Button></DialogClose>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}