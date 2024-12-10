"use client"

import React from "react"

import { Team, TeamMember } from "@/types"

import { EmptyData } from "@/components/empty-data"
import { SidebarJoinedTeamItem } from "./joined-team-item"

type Props = { joinedTeams: TeamMember[] }

export const AssignedTasksSidebar = ({ joinedTeams }: Props) => {
  return (
    <div className="space-y-2">
      {joinedTeams.length === 0 && <EmptyData title="No joined teams." />}
      {joinedTeams.map(({ team }: { team: Team }) => (
        <SidebarJoinedTeamItem key={`sidebar-item-${team.id}`} team={team} />
      ))}
    </div>
  )
}
