"use client";

import { useContext } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { UserHoverCard } from "@/app/_components/user/hover-card";
import { UserDataContext } from "@/providers/user-data-provider";
import { TeamProjectTask } from "@/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/loading-button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskRelpy } from "@/actions/project";
import { toast } from "sonner";

import { CreateTaskReply } from "@/schema";

type Props = { task: TeamProjectTask }

export const AddTaskReply = ({ task }: Props) => {

  const current = useContext(UserDataContext)
  const params: { teamId: string } = useParams()

  const form = useForm({
    resolver: zodResolver(CreateTaskReply),
    defaultValues: {
      title: '',
      description: '',
      url: ''
    },
  })

  const mutation = useMutation({
    mutationFn: ({ data }: { data: z.infer<typeof CreateTaskReply> }) => createTaskRelpy(+params.teamId, task.id, data),
    onSuccess: () => {
      toast.message("Reply has been sent!")
      form.reset()
    }
  })

  const handleCreate = () => {
    mutation.mutate({
      data: form.getValues()
    })
  }

  return ( 
    <div className='xl:flex gap-4 py-4'>

      <div className='size-10'>
        <UserHoverCard user={current} date={current.createdAt} label="Created "  />
      </div>

      <div className='w-full'>

        <div className='mb-4'>
          <h1 className='text-sm flex justify-between'>{current.displayName ?? current.name}</h1>
          <p className='text-xs text-gray-400'>@{current.username}</p>
        </div>

        <Form {...form}>
          
          <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-1'>
            
            <div className='grid xl:grid-cols-2 gap-1 grid-cols-1'>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Do feature #1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.example.com" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Do feature #1" {...field}></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton loading={mutation.isPending} variant='secondaryMain' size='sm'>Send</LoadingButton>
           
          </form>

        </Form>

      </div>
      
    </div>
  );
}