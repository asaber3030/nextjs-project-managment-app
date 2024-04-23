"use client";

import {
  CalendarIcon,
  User,
  UserPlus,
  Home,
  MessageCircle,
  RocketIcon,
  Users,
  ListChecks,
  Folder,
  Users2,
  CheckCheck,
  FolderPlus,
  Mail,
  Cog,
} from "lucide-react"
 
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { TeamHeaderSection } from "../team-section-header";
import { useRouter } from "next/navigation";

export const TeamSidebarSettings = ({ teamId }: { teamId: number }) => {

  const { push } = useRouter()

  return ( 
    <div>
      <Command className="xl:w-[300px] h-fit rounded-md shadow-sm border mb-5">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className='h-fit overflow-hidden'>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Team">

            <CommandItem className='flex gap-4' onClick={() => push(`/dashboard/teams/${teamId}/`)}>
              <ListChecks className="size-4" />
              <span>Dashboard</span>
            </CommandItem>
            
            <CommandItem className='flex gap-4' onClick={() => push(`/dashboard/teams/${teamId}/`)}>
              <ListChecks className="size-4" />
              <span>Tasks</span>
            </CommandItem>

            <CommandItem className='flex gap-4'>
              <Folder className="size-4" />
              <span>Projects</span>
            </CommandItem>

            <CommandItem className='flex gap-4'>
              <Users2 className="size-4" />
              <span>Members</span>
            </CommandItem>

            <CommandItem className='flex gap-4'>
              <CheckCheck className="size-4" />
              <span>Invitations</span>
            </CommandItem>

          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Settings">
            <CommandItem className='flex gap-4'>
              <FolderPlus className="size-4" />
              <span>Add Project</span>
            </CommandItem>
            <CommandItem className='flex gap-4'>
              <Mail className="size-4" />
              <span>Invite Members</span>
            </CommandItem>
            <CommandItem className='flex gap-4'>
              <Mail className="size-4" />
              <span>Mailing</span>
            </CommandItem>
            <CommandItem className='flex gap-4'>
              <Cog className="size-4" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}