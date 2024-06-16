"use client";

import React, { useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Cog, ImageIcon, MoreHorizontal, User, UserCheck, Users } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import { UserDataContext } from "@/providers/user-data-provider";

import { route } from "@/lib/route";

export const SidebarHeader = () => {
  
  const user = useContext(UserDataContext);
  const router = useRouter()
  
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
    <section className="py-4 mb-2 border-b border-b-black/50">
      
      <div className="flex items-center gap-3 rounded-md px-6">

        <Avatar>
          <AvatarImage className='object-contain' src={user?.photo} alt='User picture' />
          <AvatarFallback>{user?.name?.[0] ?? 'G'}</AvatarFallback>
        </Avatar>

        <div className="text-left w-full">
          <div className='flex justify-between w-full text-left'>
            <h2 className='text-sm text-gray-300 font-semibold max-w-[170px] text-ellipsis overflow-hidden'>{user?.displayName}</h2>
            <DropdownMenu>
              <DropdownMenuTrigger className=''>
                <MoreHorizontal className='size-4 text-white' />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[200px] top-1/2 right-0'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push(route.account())}><User className='size-4' /> Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(route.account('picture'))}><ImageIcon className='size-4' /> Edit Photo</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(route.account('settings'))}><Cog className='size-4' /> Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(route.account('teams'))}><Users className='size-4' /> Teams</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(route.account('subscriptions'))}><UserCheck className='size-4' /> Upgrade Plan</DropdownMenuItem>
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
