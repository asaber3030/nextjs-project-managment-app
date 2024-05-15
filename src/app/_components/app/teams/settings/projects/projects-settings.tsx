"use client";

import React from "react"

import { useGlobalTeamPermissions } from "@/hooks/useTeams"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Team, TeamMember } from "@/types"
import { ProjectOneSetting } from "./project-setting-one";
import { SettingsSkeleton } from "@/app/_components/skeleton/settings-skeleton";

type Props = {
  team: Team,
}

export const TeamProjectsSettings = ({ team }: Props) => {

  const { permissions, permissionsLoading } = useGlobalTeamPermissions(team.id, 'projects')

  return ( 
    <Card className='h-fit'>
      <CardHeader className='py-2 pt-6'>
        <CardTitle>Team Projects Permissions</CardTitle>
        <CardDescription>Team Projects Permissions [Update, Delete, Create]</CardDescription>
      </CardHeader>

      <CardContent className='space-y-1 gap-1'>
        {permissionsLoading ? (
          <SettingsSkeleton repeat={3} />
        ): (
          <div className='space-y-2'>
            {permissions?.map((permission) => (
              <ProjectOneSetting
                key={`idx-permission-project-${permission.id}`}
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