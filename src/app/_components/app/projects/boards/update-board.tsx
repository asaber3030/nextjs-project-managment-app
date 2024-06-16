"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useParams } from "next/navigation";
import { zodResolver } from '@hookform/resolvers/zod'

import { Edit2 } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { LoadingButton } from "@/components/loading-button";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
 
import { cn } from "@/lib/utils"
import { toast } from "sonner";
import { updateBoard } from "@/actions/project";

import { UpdateProjectBoardSchema } from "@/schema";
import { QueryKeys } from "@/lib/query-keys";
import { BoardBgColors, BoardTextColors } from "@/lib/colors";
import { TeamProjectBoard } from "@/types";

type Props = { 
  board: TeamProjectBoard,
  backgroundColor: string,
  textColor: string
}

export const UpdateBoardAction = ({ textColor, backgroundColor, board }: Props) => {

  const queryClient = useQueryClient()

  const params: { teamId: string, projectId: string } = useParams()
  const teamId = Number(params.teamId)
  const projectId = Number(params.projectId)

  const [open, setOpen] = useState(false)
  const [bgColor, setBgColor] = useState(board.backgroundColor)
  const [txtColor, setTxtColor] = useState(board.textColor)

  const form = useForm({
    resolver: zodResolver(UpdateProjectBoardSchema),
    defaultValues: {
      title: board.title,
      description: board.description,
      backgroundColor: board.backgroundColor,
      textColor: board.textColor,
    },
  })

  const updateMutation = useMutation({
    mutationFn: () => updateBoard(board.id, form.getValues()),
    onSuccess: (data) => {
      toast.message(data.message)
      queryClient.invalidateQueries({ queryKey: QueryKeys.teamProjectBoards(teamId, projectId) })
      setOpen(false)
    }
  })

  const handleUpdate = () => {
    updateMutation.mutate()
  }

  return ( 
    <Dialog onOpenChange={setOpen} open={open}>
      
      <TooltipProvider>
        <Tooltip delayDuration={10}>
          <TooltipTrigger asChild>
            <DialogTrigger
              style={{ backgroundColor: textColor, color: backgroundColor }}
              className={cn(
                'rounded-sm size-8 flex items-center justify-center'
              )}><Edit2 className='size-4' /></DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Update Board</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className='min-w-[850px]'>

        <DialogHeader>
          <DialogTitle>Updating board</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          
          <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Do feature #1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="backgroundColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board Background</FormLabel>
                  <FormControl>
                    <div className='flex gap-1'>
                      {BoardBgColors.map((color, idx) => (
                        <div 
                          onClick={() => {
                            setBgColor(old => color)
                            form.setValue('backgroundColor', color)
                          }}
                          style={{ backgroundColor: color }} 
                          key={`key-idx-bg-color-${idx}`} 
                          className={cn('size-7 rounded-full', bgColor === color && "border-2 border-red-400")} 
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="textColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board Text Color</FormLabel>
                  <FormControl>
                    <div className='flex gap-1'>
                      {Array.from(new Set(BoardTextColors)).map((color, idx) => (
                        <div
                          onClick={() => {
                            setTxtColor(old => color)
                            form.setValue('textColor', color)
                          }}
                          style={{ backgroundColor: color }} 
                          className={cn('size-7 rounded-full', txtColor === color && "border-2 border-red-400")}
                          key={`key-idx-bg-color-${idx}`}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Some description about feature #1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose className='px-4 h-9'>Cancel</DialogClose>
              <LoadingButton type='submit' loading={updateMutation.isPending} className='px-4 h-9'>Update</LoadingButton>
            </DialogFooter>        

          </form>

        </Form>

      </DialogContent>
      
    </Dialog>
  );
}