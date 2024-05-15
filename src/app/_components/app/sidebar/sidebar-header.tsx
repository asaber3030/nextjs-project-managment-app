"use client";

import React, { useContext } from "react";
import { useSession } from "next-auth/react";

import { Cog, ImageIcon, MoreHorizontal, Undo, User, UserCheck, Users } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { UserDataContext } from "@/providers/user-data-provider";

export const SidebarHeader = () => {
  
  const user = useContext(UserDataContext);
  
  const { status } = useSession();

  if (status === 'loading') {
    return (
      <div className='flex items-center gap-3 p-6'>
        <Skeleton className='bg-gray-500 size-10 rounded-full' />
        <div>
          <Skeleton className='bg-gray-500 w-32 h-2 mb-2' />
          <Skeleton className='bg-gray-500 w-12 h-2 mb-2' />
        </div>
      </div>
    )
  }

  return (
    <section className="p-4 pb-0">
      
      <div className="flex items-center gap-3 p-2 bg-darkNavbar rounded-md px-6">

        <Avatar>
          <AvatarImage className='object-contain' src={user?.photo} alt='User picture' />
          <AvatarFallback>{user?.name?.[0] ?? 'G'}</AvatarFallback>
        </Avatar>

        <div className="text-left w-full p-2">
          <div className='flex justify-between w-full text-left'>
            <h2 className='text-sm text-gray-300 font-bold'>{user?.email}</h2>
            <DropdownMenu>
              <DropdownMenuTrigger className=''>
                <MoreHorizontal className='size-3' />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[200px] top-1/2 right-0'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><User className='size-4' /> Profile</DropdownMenuItem>
                <DropdownMenuItem><ImageIcon className='size-4' /> Edit Photo</DropdownMenuItem>
                <DropdownMenuItem><Cog className='size-4' /> Settings</DropdownMenuItem>
                <DropdownMenuItem><Users className='size-4' /> Teams</DropdownMenuItem>
                <DropdownMenuItem><UserCheck className='size-4' /> Upgrade Plan</DropdownMenuItem>
                <DropdownMenuItem><Undo className='size-4' /> Renew Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-xs cursor-pointer hover:underline text-gray-500">@{user?.username}</p>
        </div>
      </div>
    </section>
  );
}

SidebarHeader.displayName = "SidebarHeader";
