"use client";

import React, { useContext } from "react";

import { useSession } from "next-auth/react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { Folder, Home,  Notebook, Receipt, User, UserPlus, UserRoundCheck, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserDataContext } from "@/providers/user-data-provider";

export const UserNavbarDropdown = () => {
  
  const { data } = useSession();
  
  const user = useContext(UserDataContext)
  const router = useRouter()

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
        <DropdownMenuContent className='w-[200px]'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='flex gap-4' onClick={() => router.push('/dashboard')}><Home className='size-4' /> Dashboard</DropdownMenuItem>
          <DropdownMenuItem className='flex gap-4'><Folder className='size-4' /> Projects</DropdownMenuItem>
          <DropdownMenuItem className='flex gap-4'><UserPlus className='size-4' /> Invitations</DropdownMenuItem>
          <DropdownMenuItem className='flex gap-4'><User className='size-4' /> Profile</DropdownMenuItem>
          <DropdownMenuItem className='flex gap-4'><Notebook className='size-4' /> Plan</DropdownMenuItem>
          <DropdownMenuItem className='flex gap-4'><Receipt className='size-4' /> Billing</DropdownMenuItem>
          <DropdownMenuItem className='flex gap-4'><Users className='size-4' /> Teams</DropdownMenuItem>
          <DropdownMenuItem className='flex gap-4'><UserRoundCheck className='size-4' /> Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}