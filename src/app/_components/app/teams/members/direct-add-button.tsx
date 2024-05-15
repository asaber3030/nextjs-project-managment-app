"use client";

import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'

import { useUser, useUserByCode } from '@/hooks/useUser';
import { useTeam } from '@/hooks/useTeams';
import { useGP } from '@/hooks/usePermissions';
import { useRole } from '@/hooks/useRoles';

import { Team } from "@/types";

import { LucideIcon, Plus } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { LoadingButton } from '@/components/loading-button';
import { UserHoverCard } from '@/app/_components/user/hover-card';
import { UpgradePlanAlert } from '@/components/upgrade-plan-alert';
import { NoPermissionAlert } from '@/components/no-permissions-alert';

type Props = { 
  team: Team,
  label?: string,
  icon?: LucideIcon,
}

export const DirectAddMemberButton = ({ label = 'Direct Add', icon: Icon = Plus, team }: Props) => {

  const [codeInput, setCodeInput] = useState<string>('')

  const [modal, setModal] = useState(false)

  const { user, userLoading, refetchUser, userRefetching } = useUserByCode(team.id, codeInput)
  const { directAddMutate, directAddLoading } = useTeam(team?.id)

  const permission = useGP()
  const role = useRole('members', 'direct-add-members', team.id)
  const current = useUser()

  const handleFindUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    refetchUser()
  }

  const handleDirectAdd = () => {
    directAddMutate({
      teamId: team.id,
      userId: user?.id as number,
      code: codeInput
    });
    setModal(false)
  }

  return ( 
    <Dialog open={modal} onOpenChange={setModal}>

      <DialogTrigger className='bg-white flex gap-2 text-sm hover:bg-border/80 transition-all items-center border rounded-sm px-2 py-1'><Icon className='size-4' /> {label}</DialogTrigger>

      <DialogContent className='min-w-[50%]'>

        <DialogHeader>
          <DialogTitle className='text-center'>Direct Add Members to <b>{team?.name}</b></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form onSubmit={handleFindUser}>
          <Label>Member Code</Label>
          <Input value={codeInput} onChange={(event: ChangeEvent<HTMLInputElement>) => setCodeInput(event.target.value)} placeholder='Generated Invite Code' />
          <p className='mb-3 mt-1 text-sm text-gray-600'>Every member can share with you a <strong>random code</strong> they add to allow direct access for you.</p>
          <LoadingButton disabled={!!codeInput} type='submit' className='mt-1' size='sm' loading={userLoading} variant='secondaryMain'>Find member</LoadingButton>
        </form>

        {user ? (
          <section>
            <section className='flex gap-2 items-center'>
              <UserHoverCard user={user} date={user.updatedAt} />
              <h2>{user.name}</h2>
            </section>
            {permission.canDirectAdd ? (
              <section className='mt-4 flex justify-end'>
                {(role.access || current?.id === team.ownerId) ? (
                  <LoadingButton loading={directAddLoading} onClick={handleDirectAdd} variant='outline' size='sm' className='text-black'>Add Member</LoadingButton>
                ): (
                  <NoPermissionAlert actionName='Direct add members!' />
                )}
              </section>
            ): (
              <UpgradePlanAlert displayDot={false} label='This feature belongs only to professionals plan!' parentClassName='mt-4 justify-between' actionsClassName='block space-y-2' />
            )}
          </section>
        ): codeInput && (
          <div className='bg-secondary rounded-sm shadow-sm p-2 border text-sm px-4 mb-4'>
            No User found with provided code: <b>{codeInput}</b>
          </div>
        )}
      </DialogContent>
      
    </Dialog>
  );
}