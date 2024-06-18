"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useParams } from "next/navigation"

import { Status } from "@prisma/client"

import { CalendarIcon, Edit2 } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { LoadingButton } from "@/components/loading-button"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { updateTask } from "@/actions/project"
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from "date-fns"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

import { UpdateProjectTaskSchema } from "@/schema"
import { TeamProjectTask } from "@/types"
import { ClassValue } from "clsx"

type Props = { 
  task: TeamProjectTask
  label?: string
  className?: ClassValue
  iconClassName?: string
}

export const UpdateTaskAction = ({ task, label, className, iconClassName }: Props) => {

  const queryClient = useQueryClient()
  const [date, setDate] = useState<Date>(task.finishAt)

  const params: { teamId: string, projectId: string } = useParams()
  const teamId = Number(params.teamId)
  const projectId = Number(params.projectId)

  const form = useForm({
    resolver: zodResolver(UpdateProjectTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      url: task.url as string,
      finishAt: task.finishAt,
      notes: task.notes as string,
      status: task.status,
    },
  })

  const updateMutation = useMutation({
    mutationFn: () => updateTask(task.id, { ...form.getValues(), finishAt: date as any }),
    onSuccess: (data) => {
      toast.message(data.message)
    }
  })

  const handleUpdate = () => {
    updateMutation.mutate()
  }

  return ( 
    <Dialog>
      
      <TooltipProvider>
        <Tooltip delayDuration={10}>
          <TooltipTrigger asChild>
            <DialogTrigger className={cn('rounded-sm size-8 flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-secondary/80', className)}><Edit2 className={cn('size-4', iconClassName)} /> {label}</DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Update task</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className='min-w-[850px]'>

        <DialogHeader>
          <DialogTitle>Updating Task</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          
          <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
            
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
                    <Select defaultValue={task.status} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Fruits</SelectLabel>
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

            <DialogFooter>
              <DialogClose className='px-4 h-9 border rounded-md text-sm font-medium transition-all hover:bg-border'>Close</DialogClose>
              <LoadingButton type='submit' loading={updateMutation.isPending} size='sm' variant='secondaryMain'>Update</LoadingButton>
            </DialogFooter>          
          </form>
        </Form>

      </DialogContent>
      
    </Dialog>
  )
}