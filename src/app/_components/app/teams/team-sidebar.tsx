"use client";

import React from "react";
import Link from "next/link";

import { ListChecks, Folder, CheckCheck, FolderPlus, Cog, Home, Palette, Users, Trash } from "lucide-react"

import { usePathname } from "next/navigation";
import { route } from "@/lib/route";
import { cn } from "@/lib/utils";

export const TeamSidebarSettings = ({ teamId }: { teamId: number }) => {

  const pathname = usePathname()

  const mainLinksURLs = [
    { url: route.viewTeam(teamId), label: 'Dashboard', icon: Home },
    { url: route.viewTeamProjects(teamId), label: 'Projects', icon: Folder },
    { url: route.viewTeamTasks(teamId), label: 'Tasks', icon: ListChecks },
    { url: route.viewTeamBoards(teamId), label: 'Boards', icon: Palette },
    { url: route.viewTeamMembers(teamId), label: 'Members', icon: Users },
    { url: route.viewTeamInvitations(teamId), label: 'Invitations', icon: CheckCheck },
  ]

  const settingsURLs = [
    { url: route.addTeamProject(teamId), label: 'Create Project', icon: FolderPlus },
    { url: route.viewTeamSettings(teamId), label: 'Settings', icon: Cog },
    { url: route.deleteTeam(teamId), label: 'Delete Team', icon: Trash },
  ]

  return ( 
    <aside className='border rounded-md xl:w-[400px] w-full h-fit mb-4 bg-white shadow-sm'>

      <section className='p-2 not:last-of-type:mb-4'>
        <h3 className='text-gray-600 font-semibold text-sm mb-2 ml-4'>Team</h3>
        <div className='space-y-0.5'>
          {mainLinksURLs.map(({ icon: Icon, label, url }, idx) => (
            <Link 
              href={url} 
              key={`main-sidebar-item-idx-${idx}`} 
              className={cn(
                'flex gap-4 text-sm items-center p-1 transition-all hover:bg-secondary rounded-sm px-4',
                pathname.endsWith(url) && 'hover:bg-secondaryMain bg-secondaryMain'
              )}
            >
              <Icon className='size-4' />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className='p-2 not:last-of-type:mb-4'>
        <h3 className='text-gray-600 font-semibold text-sm mb-2 ml-4'>Settings</h3>
        <div className='space-y-0.5'>
          {settingsURLs.map(({ icon: Icon, label, url }, idx) => (
            <Link key={`settings-sidebar-item-idx-${idx}`}  href={url} className='flex gap-4 text-sm items-center p-1 transition-all hover:bg-secondary rounded-md px-4'>
              <Icon className='size-4' />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </section>
      
    </aside>
  );
}

TeamSidebarSettings.displayName = "TeamSidebarSettings"
