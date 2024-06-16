"use client"

import React, { FormEvent, useDeferredValue, useEffect } from 'react'
import Link from "next/link"

import { Team } from "@/types"

import { useQuery } from "@tanstack/react-query"
import { useState, ChangeEvent } from "react"
import { useUser } from "@/hooks"
import { useTeam } from "@/hooks/useTeams"
import { useRole } from '@/hooks/useRoles'

import { searchUnInvitedMembers } from "@/actions/user-data"
import { cn } from '@/lib/utils'

import { User } from "@/types"

import { LucideIcon, UserPlus, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { UserHoverCard } from "@/app/_components/user/hover-card"
import { EmptyState } from "@/components/empty-state"
import { LoadingButton } from '@/components/loading-button'
import { NoPermissionAlert } from '@/components/no-permissions-alert'

type Props = { 
  team: Team,
  label?: string,
  icon?: LucideIcon,
  size?: 'sm' | 'lg' | 'default' | 'icon',
  className?: string
}

export const InviteButton = ({ label = 'Invite', className, icon: Icon = UserPlus, team }: Props) => {
  
  const { inviteMutate, inviteLoading } = useTeam(team?.id)

  const [filter, setFilter] = useState<string>('')
  const [finalInvitations, setFinalInvitations] = useState<User[]>([])

  const searchUsersQuery = useQuery({
    queryKey: ['users', 'search', team.id, filter],
    queryFn: ({ queryKey }) => searchUnInvitedMembers(queryKey[3] as string, team.id as number),
  })

  const role = useRole('members', 'invite-members', team.id)
  const current = useUser()
  
  const handleAddInvitations = (user: User) => {
    if (!finalInvitations.find(u => u.email === user.email)) {
      setFinalInvitations(ems => [...ems, user])
    }
  }
  const handleRemoveInvitation = (user: User) => {
    setFinalInvitations(ems => ems.filter(current => current.email != user.email))
  }

  const handleInvite = () => {
    inviteMutate({ users: finalInvitations })
    setFinalInvitations(_ => [])
  }

  const users = searchUsersQuery.data as User[]
  
  return ( 
    <Dialog>
      <DialogTrigger className={cn('flex gap-2 text-sm text-black font-medium  bg-white hover:bg-border/80 transition-all items-center border rounded-sm px-2 py-1', className)}><Icon className='size-4' /> {label}</DialogTrigger>

      <DialogContent className='min-w-[50%]'>

        <DialogHeader>
          <DialogTitle>Invite Users To <b>{team?.name}</b></DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="team-details">

          <TabsList className='w-full'>
            <TabsTrigger className='w-full' value="team-members">Team Members</TabsTrigger>
            <TabsTrigger className='w-full' value="team-invitations">Invitations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="team-members">

            <div>
              <Label>Search users</Label>
              <Input
                value={filter}
                placeholder="Filter by example@domain.com or @username"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
              />
            </div>

            {users && users.length > 0 ? (
              <section className='space-y-2 mt-4'>
                {users.map((user) => (
                  <div className='flex justify-between items-center' key={`users-invited-idx-${user.id}`}>
                    <div className="flex gap-2 items-center">
                      <UserHoverCard date={user.createdAt} user={user as User} />
                      <div>
                        <Link className='text-sm text-gray-500' href={``}>@{user.username} - {user.jobTitle}</Link>
                      </div>
                    </div>
                    <div>
                      {finalInvitations.find(current => current.email === user.email) ? (
                        <Button variant='outline' className='text-gray-500 h-7' onClick={ () => handleRemoveInvitation(user as User)}>
                          <X className='size-3' />
                        </Button>
                      ): (
                        <Button variant='outline' className='text-gray-500 h-7' onClick={ () => handleAddInvitations(user as User)}>
                          <UserPlus className='size-3' />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </section>
            ): (
              <EmptyState title='No Users.' className='mt-4' />
            )}
          </TabsContent>

          <TabsContent value='team-invitations'>

            {finalInvitations.length === 0 ? (
              <div className='bg-gray-100 mt-4 p-2 px-4 font-semibold rounded-sm shadow-sm'>No Invitations Added!</div>
            ): (
              <section className='space-y-2 mt-4'>
                {finalInvitations.map((user) => (
                  <div className='flex justify-between items-center' key={`users-final-invited-idx-${user.id}`}>
                    <div className="flex gap-2 items-center">
                      <UserHoverCard date={user.createdAt} user={user as User} />
                      <div>
                        <Link className='text-sm text-gray-500' href={``}>@{user.username} - {user.jobTitle}</Link>
                      </div>
                    </div>

                    <div>
                      {finalInvitations.find(current => current.email === user.email) ? (
                        <Button variant='outline' className='text-gray-500 h-7' onClick={ () => handleRemoveInvitation(user as User)}>
                          <X className='size-3' />
                        </Button>
                      ): (
                        <Button variant='outline' className='text-gray-500 h-7' onClick={ () => handleAddInvitations(user as User)}>
                          <UserPlus className='size-3' />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                {finalInvitations.length > 0 && (
                  <div className='flex justify-end w-full mt-4 pt-4 border-t'>
                    {(role.access || current?.id === team.ownerId) ? (
                      <LoadingButton className='text-black' loading={inviteLoading} variant='outline' size='sm' onClick={handleInvite}>Send Invitations</LoadingButton>
                    ): (
                      <NoPermissionAlert actionName='Invite Members' />
                    )}
                  </div>
                )}
              </section>
            )}
          </TabsContent>

        </Tabs>

      </DialogContent>
      
    </Dialog>
  )
}