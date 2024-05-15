"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { usePersonalTask } from "@/hooks/usePersonal"

import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"

import { PersonalTaskSchema } from "@/schema"
import { PersonalTaskStatus } from "@prisma/client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type Props = { 
  label?: string
  className?: string
}

export const CreatePersonalTask = ({ className, label = 'Create' }: Props) => {

  const { createMutate } = usePersonalTask()

  const [modal, setModal] = useState<boolean>(false)

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      url: '',
      notes: '',
      status: PersonalTaskStatus.Pending,
      finishAt: new Date()
    },
    resolver: zodResolver(PersonalTaskSchema),
  })

  const handleCreate = () => {
    createMutate({
      data: form.getValues()
    })
    setModal(false)
    form.reset()
  }

  return ( 
    <Dialog open={modal} onOpenChange={setModal}>

      <DialogTrigger className={cn(' size-14 rounded-full flex items-center justify-center bg-secondaryMain text-black ', className)}><Plus className='size-7' /></DialogTrigger>

      <DialogContent className='min-w-[50%]'>
        
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
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
                  <FormLabel>Task Status</FormLabel>
                  <FormControl>
                    <Select defaultValue={form.getValues('status')} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value={PersonalTaskStatus.Pending}>{PersonalTaskStatus.Pending}</SelectItem>
                          <SelectItem value={PersonalTaskStatus.Done}>{PersonalTaskStatus.Done}</SelectItem>
                          <SelectItem value={PersonalTaskStatus.Todo}>{PersonalTaskStatus.Todo}</SelectItem>
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
                    <Input type="date" placeholder="Do feature #1" {...form.register('finishAt', {
                      valueAsDate: true
                    })} />
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
              <Button onClick={() => setModal(false)} variant='outline' type='button'>Cancel</Button>
              <Button variant='secondaryMain' type='submit'>Create Task</Button>
            </DialogFooter>
          </form>

        </Form>
      
      </DialogContent>
    </Dialog>
  )
}