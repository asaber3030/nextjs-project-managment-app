"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { Trash } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { QueryKeys } from "@/lib/query-keys";
import { TeamProjectTask } from "@/types";

import { toast } from "sonner";
import { deleteTask } from "@/actions/project";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/loading-button";

type Props = { 
  task: TeamProjectTask 
  label?: string
  className?: ClassValue
  iconClassName?: string
}

export const DeleteTaskAction = ({ task, label, className, iconClassName }: Props) => {

  const params: { teamId: string, projectId: string } = useParams()
  const teamId = Number(params.teamId)
  const projectId = Number(params.projectId)
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () => deleteTask(task.id),
    onSuccess: (data) => {
      toast.message(data.message)
      queryClient.invalidateQueries({ queryKey: QueryKeys.teamProjectTasks(teamId, projectId) })
    }
  })

  return ( 
    <Dialog>
      <TooltipProvider>
        <Tooltip delayDuration={10}>
          <TooltipTrigger asChild>
            <DialogTrigger className={cn('rounded-sm size-8 flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-secondary/80', className)}><Trash className={cn('size-4', iconClassName)} /> {label}</DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete task</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your task data
            and remove the data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className='h-9 border rounded-md transition-all hover:bg-border px-4 text-sm'>Cancel</DialogClose>
          <LoadingButton variant='destructive' onClick={() => deleteMutation.mutate()} size='sm'>Confirm</LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}