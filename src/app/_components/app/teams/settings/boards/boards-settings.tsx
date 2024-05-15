"use client";

import React from "react"

import { useGlobalTeamPermissions } from "@/hooks/useTeams"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Team, TeamMember } from "@/types"
import { BoardOneSetting } from "./board-setting-one";
import { SettingsSkeleton } from "@/app/_components/skeleton/settings-skeleton";

type Props = {
  team: Team,
}

export const TeamBoardsSettings = ({ team }: Props) => {

  const { permissions, permissionsLoading } = useGlobalTeamPermissions(team.id, 'boards')

  return ( 
    <Card className='h-fit'>
      
      <CardHeader className='py-2 pt-6'>
        <CardTitle>Boards Permissions</CardTitle>
        <CardDescription>Boards Permissions [Delete, Create]</CardDescription>
      </CardHeader>

      <CardContent className='space-y-1 gap-1'>
        {permissionsLoading ? (
          <SettingsSkeleton repeat={2} />
        ): (
          <div className='space-y-2'>
            {permissions?.map((permission) => (
              <BoardOneSetting
                key={`idx-boards-permission-${permission.id}`}
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