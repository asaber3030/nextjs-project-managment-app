"use client";

import React from "react";

import { SidebarHeader } from "./sidebar-header";
import { SidebarLink } from "./sidebar-link";
import { CheckCheck, Cog, DollarSign, Folder, LucideHome, User, UserPlus, Users } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { SubscriptionPlanCardSidebar } from "./subscription-plan-user";
import { route } from "@/lib/route";
import { usePathname, useRouter } from "next/navigation";
import { CreateTeamButton } from "../teams/create-team-button";
import { Status } from "@prisma/client";

const UserSidebar = () => {
  
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside className='bg-navbar hidden flex-col xl:flex xl:justify-between h-full xl:fixed left-0 top-0 w-[350px] border-r border-r-secondaryMain'>
      
      <div>
        <SidebarHeader />
        <section className='p-2'>

          <SidebarLink label='Dashboard' icon={LucideHome} url={route.dashboard()} />

          <SidebarLink label='Teams' icon={Users} url={route.dashboard()}>
            <CreateTeamButton className='border-none w-full hover:bg-secondary text-left justify-start transition-all' label='Create Team' />
          </SidebarLink>

          <SidebarLink label='My Personal Projects' icon={Folder} url={route.personalProjects()}>
            <DropdownMenuItem>Create</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Invitations</DropdownMenuItem>
          </SidebarLink>

          <SidebarLink label='My Tasks' icon={CheckCheck} url='/'>
            <DropdownMenuItem onClick={() => router.push(route.createPersonalProject())}>Create</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Invitations</DropdownMenuItem>
          </SidebarLink>

          <SidebarLink label='My Invitations' icon={UserPlus} url={route.myInvitations()}>
            <DropdownMenuItem onClick={() => router.push(route.myInvitations())}>Pending</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(route.myInvitations(Status.Accepted))}>Accpeted</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(route.myInvitations(Status.Refused))}>Refused</DropdownMenuItem>
          </SidebarLink>

          <SidebarLink label='Account' icon={User} url={route.account()}>
            <DropdownMenuItem>Create</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Invitations</DropdownMenuItem>
          </SidebarLink>

          <SidebarLink label='Subscriptions' icon={DollarSign} url='/'>
            <DropdownMenuItem>Create</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Invitations</DropdownMenuItem>
          </SidebarLink>

          <SidebarLink label='Settings' icon={Cog} url='/'>
            <DropdownMenuItem>Create</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Invitations</DropdownMenuItem>
          </SidebarLink>

        </section>
      </div>

      <SubscriptionPlanCardSidebar name='Pro' />
    </aside>
  );
}
 
export default UserSidebar;