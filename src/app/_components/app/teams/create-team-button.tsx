"use client";

import React from 'react'

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, ChangeEvent, useDeferredValue } from "react";
import { useGP } from '@/hooks/usePermissions';

import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchUsers } from "@/actions/user-data";
import { createTeam } from "@/actions/team";
import { cn } from '@/lib/utils';

import { User } from "@/types";
import { CreateTeamSchema } from "@/schema";
import { QueryKeys } from '@/lib/query-keys';
import { ClassValue } from 'clsx';

import { Check, Plus, UserPlus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UpgradePlanAlert } from '@/components/upgrade-plan-alert';
import { LoadingSpinner } from "@/components/loading-spinner";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserNormalCard } from '../../user/user-card';

type Props = { 
  label: string, 
  className?: ClassValue, 
  iconClassName?: ClassValue 
}

export const CreateTeamButton = ({ label, className, iconClassName }: Props) => {

  const { data } = useSession()
  const { invalidateQueries } = useQueryClient()

  const [userEmail, setUserEmail] = useState<string>('')
  const [finalInvitations, setFinalInvitations] = useState<User[]>([])
  const [modal, setModal] = useState(false)

  const permission = useGP()
  const deferredEmail = useDeferredValue(userEmail)

  console.log({ permission })

  const searchUsersQuery = useQuery({
    queryKey: ['users', 'search'],
    queryFn: () => searchUsers(userEmail, data?.user.id as any)
  })

  const form = useForm({
    resolver: zodResolver(CreateTeamSchema),
    defaultValues: {
      name: '',
      about: '',
      emails: []
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
      toast.message(data.message)
      invalidateQueries({ queryKey: QueryKeys.userTeams() })
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
  }, [deferredEmail, searchUsersQuery])

  return ( 
    <Dialog open={modal} onOpenChange={setModal}>

      <DialogTrigger 
        className={cn('bg-secondaryMain text-sm transition-all hover:bg-secondaryMain/80 flex items-center gap-2 font-medium rounded-md px-4 h-9', className)}
      >
        <Plus className={cn('size-4', iconClassName)} /> 
        {label}
      </DialogTrigger>

      <DialogContent className="min-w-[50%]">

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
                  {permission.canCreateMoreTeams ? (
                    <DialogFooter>
                      <DialogClose><Button size='sm' type="button" variant='outline'>Cancel</Button></DialogClose>
                      <Button size='sm' type="submit" variant='secondaryMain'><Plus className='size-4' /> Create Team</Button>
                    </DialogFooter>
                  ): (
                    <UpgradePlanAlert />
                  )}
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

              {searchUsersQuery.isLoading ? (
                <LoadingSpinner className='mt-4' />
              ): (
                <React.Fragment>
                  {searchUsersQuery.data && searchUsersQuery.data.length > 0 ? (
                    <section className='space-y-2 mt-4'>

                      {searchUsersQuery.data.map((user) => (
                      
                      <div className='flex justify-between items-center' key={`search-user-idx-${user?.id}`}>
                          
                          <UserNormalCard user={user as User} />

                          <div>
                            {finalInvitations.find(current => current.email === user.email) ? (
                              <Button variant='outline' size='sm' className='p-1 px-2 rounded-full bg-secondaryMain border-secondaryMain text-white hover:bg-secondaryMain hover:text-white' onClick={ () => handleRemoveInvitation(user as User)}>
                                <Check className='size-4' />
                              </Button>
                            ): (
                              <Button variant='outline' size='sm' className='text-gray-500 p-1 px-2 rounded-full' onClick={ () => handleAddInvitations(user as User)}>
                                <UserPlus className='size-4' />
                              </Button>
                            )}
                          </div>
                          
                        </div>

                      ))}
                    </section>
                  ): (
                    <div className='mt-2 font-normal text-xs text-gray-500'>{userEmail ? 'No Users found.' : `Try typing username or email of team member.`}</div>
                  )}
                </React.Fragment>
              )}
            </TabsContent>

            <TabsContent value='team-invitations'>

              {finalInvitations.length === 0 ? (
                <div className='bg-gray-100 mt-4 p-2 px-4 font-semibold rounded-sm shadow-sm'>No Invitations Added!</div>
              ): (
                <section className='space-y-2 mt-4'>
                  {finalInvitations.map((user) => (
                    
                    <div className='flex justify-between items-center' key={`final-inv-idx-${user.id}`}>
                      
                      <UserNormalCard user={user as User} />

                      <div>
                        {finalInvitations.find(current => current.email === user.email) ? (
                          <Button variant='outline' size='sm' className='text-gray-500 p-1 px-2 rounded-full' onClick={ () => handleRemoveInvitation(user as User)}>
                            <Check className='size-4' />
                          </Button>
                        ): (
                          <Button variant='outline' size='sm' className='text-gray-500 p-1 px-2 rounded-full' onClick={ () => handleAddInvitations(user as User)}>
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