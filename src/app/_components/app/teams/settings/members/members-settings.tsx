"use client";

import React from "react"

import { useGlobalTeamPermissions } from "@/hooks/useTeams"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Team, TeamMember } from "@/types"
import { MemberOneSetting } from "./member-setting-one";
import { SettingsSkeleton } from "@/app/_components/skeleton/settings-skeleton";

type Props = {
  team: Team
}

export const TeamMembersSettings = ({ team }: Props) => {

  const { permissions, permissionsLoading } = useGlobalTeamPermissions(team.id, 'members')

  return ( 
    <Card className='h-fit'>
      
      <CardHeader className='py-2 pt-6'>
        <CardTitle>Members Permissions</CardTitle>
        <CardDescription>Members Permissions [Delete, Create]</CardDescription>
      </CardHeader>

      <CardContent className='space-y-1 gap-1'>
        {permissionsLoading ? (
          <SettingsSkeleton />
        ): (
          <div className='space-y-2'>
            {permissions?.map((permission) => (
              <MemberOneSetting
                key={`idx-members-permission-${permission.id}`}
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