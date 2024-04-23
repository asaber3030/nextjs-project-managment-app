"use client";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState, ChangeEvent, useDeferredValue } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { findUsersByArray, searchUsers } from "@/actions/user-data";
import { CreateTeamSchema } from "@/schema";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { UserAvatar } from "../../user/avatar";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader, Plus, Search, UserPlus, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { UserHoverCard } from "../../user/hover-card";

import { User } from "@/types/user";
import { LoadingSpinner } from "@/components/loading-spinner";
import Link from "next/link";
import { createTeam } from "@/actions/team";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode
}

export const CreateTeamButton = ({ children }: Props) => {

  const { data } = useSession()
  const { invalidateQueries } = useQueryClient()

  const [userEmail, setUserEmail] = useState<string>('')
  const [finalInvitations, setFinalInvitations] = useState<User[]>([])
  const [modal, setModal] = useState(false)

  const deferredEmail = useDeferredValue(userEmail)

  const searchUsersQuery = useQuery({
    queryKey: ['users', 'search', deferredEmail],
    queryFn: ({ queryKey }) => searchUsers(queryKey[2] as string, data?.user.id as any),
    enabled: !!userEmail === true
  })

  const form = useForm({
    resolver: zodResolver(CreateTeamSchema),
    defaultValues: {
      'name': '',
      'about': '',
      'emails': []
    }
  })

  const handleAddInvitations = (user: User) => {
    if (!finalInvitations.find(u => u.email === user.email)) {
      setFinalInvitations(ems => [...ems, user])
    }
  }
  const handleRemoveInvitation = (user: User) => {
    setFinalInvitations(ems => ems.filter(current => current.email != user.email))
  }

  const createMutation = useMutation({
    mutationFn: () => createTeam(data?.user.id as any, finalInvitations, form.getValues()),
    onSuccess: (data) => {
      invalidateQueries({ queryKey: ['user', 'teams'] })
      if (data.status === 200) {
        toast.success(data.message)
      }
    }
  })

  const handleCreate = () => {
    createMutation.mutate()
    setModal(false)
    setFinalInvitations(old => [])
    setUserEmail(old => '')
  }

  useEffect(() => {
    searchUsersQuery.refetch()
  }, [deferredEmail])

  return ( 
    <Dialog open={modal} onOpenChange={setModal}>

      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px] xl:min-w-[650px]">

        <DialogHeader>
          <DialogTitle>Create new team</DialogTitle>
          <DialogDescription>Create, manage, add members to your team!</DialogDescription>
        </DialogHeader>

        <div>

          <Tabs defaultValue="team-details">

            <TabsList className='w-full'>
              <TabsTrigger className='w-full' value="team-details">Team Details</TabsTrigger>
              <TabsTrigger className='w-full' value="team-members">Team Members</TabsTrigger>
              <TabsTrigger className='w-full' value="team-invitations">Invitations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="team-details">
              <Form {...form}>

                <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team Name / Title</FormLabel>
                        <FormControl>
                          <Input placeholder="example@domain.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Brief (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="About team" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <DialogClose><Button size='sm' type="button" variant='outline'>Cancel</Button></DialogClose>
                    <Button size='sm' type="submit" variant='secondaryMain'><Plus className='size-4' /> Create Team</Button>
                  </DialogFooter>
                </form>
              </Form>

            </TabsContent>
            
            <TabsContent value="team-members">

              <div>
                <Label>Search users</Label>
                <div className='flex gap-1'>
                  <Input
                    value={userEmail}
                    placeholder="example@domain.com or @username"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)}
                  />
                </div>
              </div>

              {searchUsersQuery.isRefetching || searchUsersQuery.isLoading ? (
                <LoadingSpinner className='mt-4' />
              ): (
                <React.Fragment>
                  {searchUsersQuery.data && searchUsersQuery.data.length > 0 && (
                    <section className='space-y-2 mt-4'>
                      {searchUsersQuery.data.map((user) => (
                        <div className='flex justify-between items-center'>
                          <div className="flex gap-2 items-center">
                            <UserHoverCard date={user.createdAt} user={user as User} />
                            <div>
                              <Link className='text-sm text-gray-500' href={``}>@{user.username} - {user.jobTitle}</Link>
                            </div>
                          </div>
                          <div>
                            {finalInvitations.find(current => current.email === user.email) ? (
                              <Button variant='outline' size='sm' className='text-gray-500' onClick={ () => handleRemoveInvitation(user as User)}>
                                <X className='size-4' />
                              </Button>
                            ): (
                              <Button variant='outline' size='sm' className='text-gray-500' onClick={ () => handleAddInvitations(user as User)}>
                                <UserPlus className='size-4' />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </section>
                  )}
                </React.Fragment>
              )}
            </TabsContent>

            <TabsContent value='team-invitations'>

              {finalInvitations.length === 0 ? (
                <div className='bg-gray-100 mt-4 p-2 px-4 font-bold rounded-sm shadow-sm'>No Invitations Added!</div>
              ): (
                <section className='space-y-2 mt-4'>
                  {finalInvitations.map((user) => (
                    <div className='flex justify-between items-center'>
                      <div className="flex gap-2 items-center">
                        <UserHoverCard date={user.createdAt} user={user as User} />
                        <div>
                          <Link className='text-sm text-gray-500' href={``}>@{user.username} - {user.jobTitle}</Link>
                        </div>
                      </div>
                      <div>
                        {finalInvitations.find(current => current.email === user.email) ? (
                          <Button variant='outline' size='sm' className='text-gray-500' onClick={ () => handleRemoveInvitation(user as User)}>
                            <X className='size-4' />
                          </Button>
                        ): (
                          <Button variant='outline' size='sm' className='text-gray-500' onClick={ () => handleAddInvitations(user as User)}>
                            <UserPlus className='size-4' />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </section>
              )}
            </TabsContent>

          </Tabs>


        </div>

      </DialogContent>

    </Dialog>
  );
}