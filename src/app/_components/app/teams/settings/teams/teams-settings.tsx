"use client";

import React from "react"

import { useGlobalTeamPermissions } from "@/hooks/useTeams"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SettingsSkeleton } from "@/app/_components/skeleton/settings-skeleton";
import { TeamOneSetting } from "./team-setting-one";
import { Team, TeamMember } from "@/types"

type Props = {
  team: Team,
}

export const TeamsSettings = ({ team }: Props) => {

  const { permissions, permissionsLoading } = useGlobalTeamPermissions(team.id, 'teams')

  return ( 
    <Card className='h-fit'>
      <CardHeader className='py-2 pt-6'>
        <CardTitle>Teams Permissions</CardTitle>
        <CardDescription>Teams Permissions [Update, Delete, Create, Assign]</CardDescription>
      </CardHeader>

      <CardContent className='space-y-1 gap-1'>
        {permissionsLoading ? (
          <SettingsSkeleton />
        ): (
          <div className='space-y-2'>
            {permissions?.map((permission) => (
              <TeamOneSetting
                key={`idx-teams-permission-${permission.id}`}
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