"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useMembers } from "@/hooks/useMembers";

import { Check, Undo } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { LoadingSpinner } from "@/components/loading-spinner";
import { LoadingButton } from "@/components/loading-button";
import { UserHoverCard } from "@/app/_components/user/hover-card";

import { toast } from "sonner";
import { assignTaskTo } from "@/actions/project";
import { cn } from "@/lib/utils";
import { QueryKeys } from "@/lib/query-keys";

import { TeamProjectTask } from "@/types";
import { ClassValue } from "clsx";

type Props = { 
  task: TeamProjectTask
  label?: string
  className?: ClassValue
  iconClassName?: string
}

export const AssignTaskAction = ({ task, label, className, iconClassName }: Props) => {

  const queryClient = useQueryClient()

  const params: { teamId: string, projectId: string } = useParams()
  const teamId = Number(params.teamId)
  const projectId = Number(params.projectId)

  const [activeUser, setActiveUser] = useState(task.userId)

  const { members, isMembersLoading } = useMembers(teamId)

  const assignMutation = useMutation({
    mutationFn: () => assignTaskTo(task.id, activeUser),
    onSuccess: (data) => {
      toast.message(data.message)
      queryClient.invalidateQueries({ queryKey: QueryKeys.teamProjectTasks(teamId, projectId) })
    }
  })

  const handleAssign = () => {
    assignMutation.mutate()
  }

  return ( 
    <Dialog>

      <TooltipProvider>
        <Tooltip delayDuration={10}>
          <TooltipTrigger asChild>
            <DialogTrigger className={cn('rounded-sm size-8 flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-secondary/80', className)}><Undo className={cn('size-4', iconClassName)} /> {label}</DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reassign tasks</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className='min-w-[600px]'>
        
        <DialogHeader>
          <DialogTitle>Reassign Task</DialogTitle>
          <DialogDescription>Change task from user <b className='font-medium'>{task.user.displayName ?? task.user.name} / @{task.user.username}</b></DialogDescription>
        </DialogHeader>

        <section>
          {isMembersLoading ? (
            <LoadingSpinner />
          ): (
            <div className='space-y-1'>
              {members?.map((member) => (
                <div
                  onClick={ () => setActiveUser(member.userId) }
                  key={`team-member-assign-idx-${member.id}`} 
                  className={cn('select-none cursor-pointer border flex justify-between items-center p-2 px-4 rounded-md shadow-sm gap-4 hover:bg-secondary transition-all', activeUser === member.userId && 'bg-secondary')}>
                  <div className='flex items-centers gap-2'>
                    <UserHoverCard user={member.user} date={member.joinedIn} />
                    <div>
                      <h2 className='font-semibold'>{member.user.name}</h2>
                      <p className='text-xs'>{member.user.jobTitle}</p>
                    </div>
                  </div>
                  {member.userId === activeUser && (
                    <Check />
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      
        <DialogFooter>
          <DialogClose className='px-4 h-9 border rounded-md text-sm font-medium transition-all hover:bg-border'>Close</DialogClose>
          <LoadingButton  onClick={handleAssign}  loading={assignMutation.isPending} size='sm' variant='secondaryMain'>Update</LoadingButton>
        </DialogFooter>  
      
      </DialogContent>

    </Dialog>
  );
}