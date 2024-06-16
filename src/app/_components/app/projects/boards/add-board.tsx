"use client";
import React from "react";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useUser } from "@/hooks";
import { useRole } from "@/hooks/useRoles";
import { useTPP } from "@/hooks/usePermissions";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoadingButton } from "@/components/loading-button";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { NoPermissionAlert } from "@/components/no-permissions-alert";
import { UpgradePlanAlert } from "@/components/upgrade-plan-alert";
 
import { cn } from "@/lib/utils"
import { toast } from "sonner";
import { zodResolver } from '@hookform/resolvers/zod'
import { createBoard } from "@/actions/project";
import { QueryKeys } from "@/lib/query-keys";
import { BoardBgColors, BoardTextColors } from "@/lib/colors";
import { TeamProject } from "@/types";
import { CreateProjectBoardSchema } from "@/schema";

type Props = { 
  project: TeamProject,
  className?: string
}

export const AddBoardAction = ({ className, project }: Props) => {

  const queryClient = useQueryClient()
  const user = useUser()
  const permission = useTPP()
  const roleAddBoard = useRole('boards', 'add-boards', project.teamId)

  const [open, setOpen] = useState(false)
  const [bgColor, setBgColor] = useState('')
  const [txtColor, setTxtColor] = useState('')

  const form = useForm({
    resolver: zodResolver(CreateProjectBoardSchema),
    defaultValues: {
      title: '',
      description: '',
      backgroundColor: '',
      textColor: '',
    },
  })

  const createMutation = useMutation({
    mutationFn: () => createBoard(project.id, user?.id as number, form.getValues()),
    onSuccess: (data) => {
      toast.message(data.message)
      queryClient.invalidateQueries({ queryKey: QueryKeys.teamProjectBoards(project.teamId, project.id) })
      setOpen(false)
    }
  })

  const handleCreate = () => {
    createMutation.mutate()
  }

  return ( 
    <Dialog onOpenChange={setOpen} open={open}>

      <DialogTrigger className={cn('rounded-sm text-blackborder-input bg-background font-medium text-sm hover:bg-accent p-0.5 px-4 w-full border hover:text-accent-foreground', className)}>Add Board</DialogTrigger>

      <DialogContent className='min-w-[850px]'>

        <DialogHeader>
          <DialogTitle>Updating board</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          
          <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
            
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

            {permission.canCreateMoreBoards ? (
              <React.Fragment>
                {(roleAddBoard.access || project?.team?.ownerId === user?.id) ? (
                  <DialogFooter>
                    <LoadingButton type='submit' loading={createMutation.isPending} className='px-4 h-9'>Create</LoadingButton>
                  </DialogFooter>
                ): (
                  <NoPermissionAlert actionName="Create New Board" />
                )}
              </React.Fragment>
            ): (
              <UpgradePlanAlert label='Boards limit reached!' />
            )}
          </form>

        </Form>

      </DialogContent>
      
    </Dialog>
  );
}