"use client";

import { useState } from "react";
import { useTeams } from "@/hooks/useTeams";

import { ArrowLeftFromLine } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { LoadingButton } from "@/components/loading-button";
import { EmptyData } from "@/components/empty-data";

import { Team } from "@/types";
import { toast } from "sonner";

type Props = {
  teams: Team[]
}

export const LeaveAllTeamsButton = ({ teams }: Props) => {

  const [selectedTeams, setSelectedTeams] = useState<number[]>([])
  const [modal, setModal] = useState(false)

  const { mutateLeaveAll, leaveAllLoading } = useTeams()

  return ( 
    <Dialog open={modal} onOpenChange={setModal}>

      <DialogTrigger className='border border-red-600 transition-all h-9 hover:bg-red-700 flex text-red-700 hover:text-white rounded-md px-4 items-center gap-2 text-sm font-medium'><ArrowLeftFromLine className='size-4' /> Leave All</DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>Leave Selected Teams.</DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently delete your teams and remove your data from our servers.</DialogDescription>
        </DialogHeader>

        <div className='divide-y'>

          {teams?.map((team) => (

            <div key={`select-team-idx-${team.id}`} className="flex items-center space-x-2 py-2 select-none">
              <Checkbox 
                id={`team-${team.id}`} 
                onCheckedChange={(checked: boolean) => {
                  if (!checked) {
                    setSelectedTeams(old => old.filter(filteredId => filteredId != team.id))
                  }
                  if (!selectedTeams.find((item) => item === team.id)) {
                    setSelectedTeams(old => [...old, team.id])
                  }
                }} 
              />
              <label
                htmlFor={`team-${team.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {team.name}
              </label>
            </div>
          ))}
        </div>

        {selectedTeams.length > 0 ? (
          <DialogFooter>

            <DialogClose className='rounded-md px-4 border text-sm font-medium'>Close</DialogClose>

            <LoadingButton 
              variant='destructive' 
              size='sm'
              loading={leaveAllLoading}
              onClick={() => {
                if (selectedTeams.length == 0) {
                  toast.message("Select Teams to leave.")
                  return;
                }
                mutateLeaveAll({ data: selectedTeams })
                setSelectedTeams(_ => [])
                setModal(false)
              }} 
            >Leave All</LoadingButton>
          </DialogFooter>
        ): (
          <EmptyData title="No Teams available to leave!" />
        )}
      </DialogContent>
    </Dialog>
  );
}