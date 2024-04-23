"use client";

import { useSession } from "next-auth/react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Cog, Folder, Home, Landmark, Notebook, Plus, Receipt, Search, SunMoon, User, UserPlus, UserRoundCheck, Users } from "lucide-react";
import { ThemeToggler } from "@/components/toggle-theme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SearchApp } from "../search-app";

export const AuthLinks = () => {

  const { data } = useSession();

  const router = useRouter()

  return ( 
    <div className='flex gap-1'>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant='navbar' size='sm'><Search className='size-4' /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[800px]'>
          <SearchApp />
        </DropdownMenuContent>
      </DropdownMenu>


      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant='navbar' size='sm'><SunMoon className='size-4' /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[350px] p-4'>
          <ThemeToggler />
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant='navbar' size='sm'><Cog className='size-4' /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[200px]'>
          <DropdownMenuItem>Invitations</DropdownMenuItem>
          <DropdownMenuItem>Invitations</DropdownMenuItem>
          <DropdownMenuItem>Invitations</DropdownMenuItem>
          <DropdownMenuItem>Invitations</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant='navbar' size='sm'><Plus className='size-4' /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[200px]'>
          <DropdownMenuItem onClick={() => router.push('/dashboard')} className='flex gap-4'><Landmark className='size-4' /> Organization</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/dashboard')} className='flex gap-4'><Users className='size-4' /> Team</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/dashboard')} className='flex gap-4'><Folder className='size-4' /> Project</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button className='flex justify-between items-center text-black hover:bg-lightMain' variant='ghost'>
            <Avatar className='size-8'>
              <AvatarImage src={`https://github.com/shadcn.png`} alt='User picture' />
              <AvatarFallback>{data?.user?.username}</AvatarFallback>
            </Avatar>
            <span className='text-white text-xs'>@{data?.user?.username}</span>
          </Button>
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
    </div>
  );
}