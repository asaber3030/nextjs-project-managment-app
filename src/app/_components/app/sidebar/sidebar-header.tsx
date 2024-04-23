"use client";

import Link from "next/link";
import React from "react";

import { useUser } from "@/hooks";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { Cog, Image, MoreHorizontal, Undo, User, UserCheck, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

export const SidebarHeader = () => {
  
  const user = useUser();
  const { status } = useSession();

  if (status === 'loading') return <SidebarHeader.Loading />

  return (
    <section className="p-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={`https://github.com/shadcn.png`} alt='User picture' />
          <AvatarFallback>{user?.name?.[0] ?? 'G'}</AvatarFallback>
        </Avatar>
        <div className="text-left w-full p-2">
          <div className='flex justify-between w-full text-left'>
            <h2 className='text-sm font-bold'>{user?.email}</h2>
            <DropdownMenu>
              <DropdownMenuTrigger className=''>
                <Button variant='ghost' className='h-0 text-black'><MoreHorizontal className='size-3' /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[200px] top-1/2 right-0'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><User className='size-4' /> Profile</DropdownMenuItem>
                <DropdownMenuItem><Image className='size-4' /> Edit Photo</DropdownMenuItem>
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

SidebarHeader.Loading = () => {
  return (
    <div className='flex items-center gap-3 p-4'>
      <Skeleton className='bg-gray-500 size-10 rounded-full' />
      <div>
        <Skeleton className='bg-gray-500 w-32 h-2 mb-2' />
        <Skeleton className='bg-gray-500 w-12 h-2 mb-2' />
      </div>
    </div>
  )
}