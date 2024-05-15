"use client"

import { useTeams } from "@/hooks/useTeams"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingButton } from "@/components/loading-button"
import { ClassValue } from "clsx"

import { cn } from "@/lib/utils"

type Props = { 
  membershipId: number, 
  teamId: number, 
  className?: ClassValue
}

export const LeaveOneTeamButton = ({ membershipId, teamId, className }: Props) => {

  const { mutateLeaveOne, leaveOneLoading } = useTeams()

  return ( 
    <Dialog>

      <DialogTrigger className={cn('hover:underline flex text-black rounded-md px-4 items-center gap-2 text-sm font-medium', className)}>Leave</DialogTrigger>
      
      <DialogContent>

        <DialogHeader>
          <DialogTitle>Are you sure that you want to leave this team?</DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently delete your teams and remove your data from our servers.</DialogDescription>
        </DialogHeader>

        <DialogFooter>

          <DialogClose className='rounded-md px-4 border text-sm font-medium'>Close</DialogClose>
          
          <LoadingButton 
            variant='destructive' 
            size='sm'
            loading={leaveOneLoading}
            onClick={() => {
              mutateLeaveOne({ data: membershipId })
            }}
          >Submit</LoadingButton>

        </DialogFooter>

      </DialogContent>

    </Dialog>
  )
}