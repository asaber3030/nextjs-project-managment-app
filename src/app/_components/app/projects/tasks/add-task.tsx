"use client";

import React from 'react'

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTPP } from "@/hooks/usePermissions";
import { useRole } from '@/hooks/useRoles';
import { useUser } from '@/hooks';

import { User } from "@/types";
import { TeamProject } from "@/types";
import { Status } from "@prisma/client";

import { CalendarIcon, Check } from "lucide-react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserHoverCard } from "@/app/_components/user/hover-card";
import { LoadingButton } from "@/components/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area";
import { UpgradePlanAlert } from "@/components/upgrade-plan-alert";
import { EmptyData } from "@/components/empty-data";

import { getTeamMembers } from "@/actions/team";
import { createTask } from "@/actions/project";
import { cn } from "@/lib/utils"
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from "date-fns"
import { toast } from "sonner";

import { UpdateProjectTaskSchema } from "@/schema";
import { QueryKeys } from "@/lib/query-keys";
import { NoPermissionAlert } from '@/components/no-permissions-alert';

type Props = { 
  projectId: number,
  project: TeamProject,
  className?: string
}

export const AddTaskAction = ({ className, project }: Props) => {

  const queryClient = useQueryClient()
  const permission = useTPP()
  const user = useUser()
  const roleAddTask = useRole('tasks', 'add-tasks', project.teamId)

  const [date, setDate] = useState<Date>(new Date())
  const [modal, setModal] = useState(false)
  const [assignedTo, setAssignedTo] = useState<number[]>([])

  const queryTeamMembers = useQuery({
    queryKey: QueryKeys.teamMembers(project.teamId),
    queryFn: ({ queryKey }) => getTeamMembers(queryKey[2] as number)
  })

  const members = queryTeamMembers.data?.members

  const form = useForm({
    resolver: zodResolver(UpdateProjectTaskSchema),
    defaultValues: {
      title: '',
      status: Status.Pending,
      description: '',
      url: '' ,
      notes: '' ,
      finishAt: '',
    },
  })

  const handleAddAssign = (userId: number) => {
    setAssignedTo(old => {
      if (old.find(item => item === userId)) {
        return old.filter(x => x !== userId)
      }
      return [...old, userId]
    })
  }

  const createMutation = useMutation({
    mutationFn: () => createTask(project.id, { ...form.getValues(), finishAt: date as any, userId: assignedTo }),
    onSuccess: (data) => {
      toast.message(data.message)
      queryClient.invalidateQueries({ queryKey: QueryKeys.teamProjectTasks(project.teamId, project.id) })
      form.reset()
      setModal(_ => false)
      setAssignedTo(_ => [])
    }
  })

  const handleCreate = () => {
    if (!date) {
      toast.error("Please select task deadline.")
      return
    }
    if (assignedTo.length == 0) {
      toast.error("Please select at least one member to assign this task to.")
      return
    }
    createMutation.mutate()
  }

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      
      <DialogTrigger className={cn(className, 'rounded-sm text-blackborder-input font-medium text-sm bg-background p-0.5 px-4 hover:bg-accent border hover:text-accent-foreground')}>Add Task</DialogTrigger>

      <DialogContent className='min-w-[60%] max-h-[80%] overflow-auto'>

        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        <Form {...form}>
        
          <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Do feature #1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Status <span className='text-gray-500 text-xs'>({Status.Pending}, {Status.Accepted}, {Status.Refused})</span></FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value={Status.Pending}>{Status.Pending}</SelectItem>
                          <SelectItem value={Status.Accepted}>{Status.Accepted}</SelectItem>
                          <SelectItem value={Status.Refused}>{Status.Refused}</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="finishAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Finish At</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full h-10 justify-start text-left m-0 font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 mt-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(x) => {
                            setDate(x as Date)
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Do feature #1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Input placeholder="Notes..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Some description about feature #1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ScrollArea>
              <h1 className="text-lg font-bold mb-2">Assign to Members</h1>
              <div className='space-y-1'>
                {members?.map(member => (
                  <div
                    onClick={() => handleAddAssign(member.userId)}
                    key={`team-member-assign-idx-${member.id}`} 
                    className={cn('select-none cursor-pointer border flex justify-between items-center p-2 px-4 rounded-md shadow-sm gap-4 hover:bg-secondary transition-all', assignedTo.find(item => item === member.userId) && 'bg-secondary border-secondary')}>
                    <div className='flex items-centers gap-2'>
                      <UserHoverCard user={member.user as User} date={member.joinedIn} />
                      <div>
                        <h2 className='font-semibold'>{member.user.name}</h2>
                        <p className='text-xs'>{member.user.jobTitle}</p>
                      </div>
                    </div>
                    {assignedTo.find(item => item === member.userId) && <Check />}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {members?.length === 0 ? (
              <EmptyData label="No members to assign data!" />
            ): (
              <React.Fragment>
                {permission.canCreateMoreTasks ? (
                  <React.Fragment>
                    {(roleAddTask.access || project.team.ownerId === user?.id) ? (
                      <DialogFooter>
                        <LoadingButton type='submit' loading={createMutation.isPending} className='px-4 h-9 text-black' variant='outline'>Create Task</LoadingButton>
                      </DialogFooter>   
                    ): (
                      <NoPermissionAlert actionName="Create New Tasks" />
                    )}
                  </React.Fragment>
                ): (
                  <UpgradePlanAlert label='Tasks limit reached!' />
                )} 
              </React.Fragment>
            )}
          </form>

        </Form>

      </DialogContent>
      
    </Dialog>
  );
}