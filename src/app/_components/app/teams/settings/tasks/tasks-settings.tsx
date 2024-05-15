"use client";

import React from "react"

import { useGlobalTeamPermissions } from "@/hooks/useTeams"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SettingsSkeleton } from "@/app/_components/skeleton/settings-skeleton";
import { TaskOneSetting } from "./task-setting-one";
import { Team, TeamMember } from "@/types"

type Props = {
  team: Team,
}

export const TeamTasksSettings = ({ team }: Props) => {

  const { permissions, permissionsLoading } = useGlobalTeamPermissions(team.id, 'tasks')

  return ( 
    <Card className='h-fit'>
      <CardHeader className='py-2 pt-6'>
        <CardTitle>Tasks Permissions</CardTitle>
        <CardDescription>Tasks Permissions [Update, Delete, Create, Assign]</CardDescription>
      </CardHeader>

      <CardContent className='space-y-1 gap-1'>
        {permissionsLoading ? (
          <SettingsSkeleton />
        ): (
          <div className='space-y-2'>
            {permissions?.map((permission) => (
              <TaskOneSetting
                key={`idx-tasks-permission-${permission.id}`}
                teamId={team.id}
                permission={permission}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}