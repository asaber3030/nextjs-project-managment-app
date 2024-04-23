"use client";

import React from "react";

import { useUser } from "@/hooks";

import { Separator } from "@/components/ui/separator";
import { SidebarHeader } from "./sidebar-header";
import { SidebarLink } from "./sidebar-link";
import { Folder, User } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { SubscriptionPlanCardSidebar } from "./subscription-plan-user";

const UserSidebar = () => {
  
  const user = useUser();

  return (
    <aside className='bg-[#f1f1f1] hidden xl:block h-full xl:fixed left-0 w-[350px]'>

      <SidebarHeader />
      
      <section className='p-2'>
        <SidebarLink label='Projects' icon={Folder} url='/'>
          <DropdownMenuItem>Create</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Invitations</DropdownMenuItem>
        </SidebarLink>

        <SidebarLink label='Teams' icon={User} url='/'>
          <DropdownMenuItem>Create</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Invitations</DropdownMenuItem>
        </SidebarLink>

      </section>

      <SubscriptionPlanCardSidebar name='Pro' />

    </aside>
  );
}
 
export default UserSidebar;