import Link from "next/link";
import React from "react";

import { Team } from "@/types";

import { CheckCheck, Folder, ListChecks, LucideIcon, Palette, Users2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { route } from "@/lib/route";

type Props = { 
  team: Team,
  analytics: {
    members: number,
    tasks: number,
    boards: number,
    invitations: number,
    projects: number,
  }
}

export const DisplayTeamAnalytics = ({ analytics, team }: Props) => {

  const items = [
    { label: 'Members', icon: Users2, numbers: `${analytics.members} members`, url: route.viewTeamMembers(team.id), buttonLabel: 'Members' },
    { label: 'Boards', icon: Palette, numbers: `${analytics.boards} boards`, url: route.viewTeamProjects(team.id), buttonLabel: 'Boards' },
    { label: 'Tasks', icon: ListChecks, numbers: `${analytics.tasks} tasks`, url: route.viewTeamProjects(team.id), buttonLabel: 'Create' },
    { label: 'Projects', icon: Folder, numbers: `${analytics.projects} projects`, url: route.addTeamProject(team.id), buttonLabel: 'Create' },
    { label: 'Invitations', icon: CheckCheck, numbers: `${analytics.invitations} invitations`, url: route.viewTeamInvitations(team.id), buttonLabel: 'View' },
  ]

  return (
    <section>

      <h1 className='text-xl font-semibold'>Analytics</h1>

      <div className='mt-2 grid xl:grid-cols-5 gap-2'>

        {items.map(({ icon: Icon, label, numbers, buttonLabel, url }, idx) => (
          <div key={`single-item-analytics-${idx}`} className="flex flex-col text-center justify-center rounded-md p-2 border space-y-2 bg-white shadow-sm">
            <Icon className='mx-auto' />
            <span>{label}</span> 
            <Badge className="w-full text-center mb-2" variant='outline'>{numbers}</Badge>
            <Link className='w-full block' href={url}><Button className='w-full' variant='secondary'>{buttonLabel}</Button></Link>
          </div>
        ))}

      </div>

    </section>
  );
}

DisplayTeamAnalytics.displayName = "DisplayTeamAnalytics";
