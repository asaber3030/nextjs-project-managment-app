"use client";

import React, { useContext } from "react";

import { signOut, useSession } from "next-auth/react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { redirect, useRouter } from "next/navigation";
import { CheckCheck, Cog, Folder, Home,  LogOut,  Notebook, Receipt, User, UserPlus, UserRoundCheck, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserDataContext } from "@/providers/user-data-provider";
import { route } from "@/lib/route";

export const UserNavbarDropdown = () => {
  
  const { data } = useSession();
  
  const user = useContext(UserDataContext)
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut().then(() => {
      redirect('/login')
    })
  }

  return ( 
    <DropdownMenu>
        <DropdownMenuTrigger className='text-white p-0.5 py-0.5 px-2 hover:bg-secondaryMain transition-all rounded-md'>
          <div className='flex gap-3 items-center'>
            <Avatar className='size-8'>
              <AvatarImage className='object-contain' src={user?.photo} alt='User picture' />
              <AvatarFallback>{data?.user?.username[0]}</AvatarFallback>
            </Avatar>
            <span className='text-white text-xs'>@{data?.user?.username}</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[250px]'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='flex gap-4' onClick={() => router.push(route.dashboard())}><Home className='size-4' /> Dashboard</DropdownMenuItem>
          <DropdownMenuItem className='flex gap-4' onClick={() => router.push(route.account())}><User className='size-4' /> Profile</DropdownMenuItem>
          <DropdownMenuItem className='flex gap-4' onClick={() => router.push(route.personalProjects())}><Folder className='size-4' /> Projects</DropdownMenuItem>
          <DropdownMenuItem className='flex gap-4' onClick={() => router.push(route.myInvitations())}><UserPlus className='size-4' /> Invitations</DropdownMenuItem>
          <DropdownMenuItem className='flex gap-4' onClick={() => router.push(route.joinedTeams())}><Users className='size-4' /> Joined Teams</DropdownMenuItem>
          <DropdownMenuItem className='flex gap-4' onClick={() => router.push(route.assignedTasks())}><CheckCheck className='size-4' /> Assigned Tasks</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='flex gap-4' onClick={() => router.push(route.account('settings'))}><Cog className='size-4' /> Settings</DropdownMenuItem>
          <DropdownMenuItem className='flex gap-4 focus:bg-red-100 text-red-600 focus:text-red-600' onClick={handleSignOut}><LogOut className='size-4' /> Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}