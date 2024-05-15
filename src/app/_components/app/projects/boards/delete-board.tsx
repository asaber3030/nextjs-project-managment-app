"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { QueryKeys } from "@/lib/query-keys";
import { TeamProjectBoard } from "@/types";

import { Trash } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { deleteBoard } from "@/actions/project";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = { 
  board: TeamProjectBoard,
  backgroundColor: string,
  textColor: string
}

export const DeleteBoardAction = ({ backgroundColor, textColor, board }: Props) => {

  const params: { teamId: string, projectId: string } = useParams()
  const teamId = Number(params.teamId)
  const projectId = Number(params.projectId)
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () => deleteBoard(board.id),
    onSuccess: (data) => {
      toast.message(data.message)
      queryClient.invalidateQueries({ queryKey: QueryKeys.teamProjectBoards(teamId, projectId) })
    }
  })

  return ( 
    <AlertDialog>
      <TooltipProvider>
        <Tooltip delayDuration={10}>
          <TooltipTrigger asChild>
            <AlertDialogTrigger
              style={{ backgroundColor: textColor, color: backgroundColor }}
              className={cn(
                'rounded-sm size-8 flex items-center justify-center'
              )}><Trash className='size-4' /></AlertDialogTrigger>          
              </TooltipTrigger>
          <TooltipContent>
            <p>Delete board</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your board data
            and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='h-9'>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteMutation.mutate()} className='bg-red-500 hover:bg-red-500/80 h-9'>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}