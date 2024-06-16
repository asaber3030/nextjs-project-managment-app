"use client";

import { Cog } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { useRouter } from "next/navigation";
import { route } from "@/lib/route";

export const AppLinksNavbarDropdown = () => {

  const router = useRouter()

  return ( 
    <DropdownMenu>
      <DropdownMenuTrigger className='text-white p-0.5 py-0 px-2 hover:bg-secondaryMain transition-all rounded-md'>
        <Cog className='size-4' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[250px]'>
        <DropdownMenuItem onClick={() => router.push(route.teams())}>My teams</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(route.personalProjects())}>My Personal Projects</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(route.account('settings'))}>Direct Code</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(route.account())}>Invitations Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}