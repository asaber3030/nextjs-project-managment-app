"use client";

import React from "react";

import { useRole } from "@/hooks/useRoles";
import { useUser } from "@/hooks";

import { Team } from "@/types";

import { Title } from "@/components/title";
import { TeamTasksSettings } from "./tasks/tasks-settings";
import { TeamBoardsSettings } from "./boards/boards-settings";
import { TeamProjectsSettings } from "./projects/projects-settings";
import { TeamMembersSettings } from "./members/members-settings";
import { TeamsSettings } from "./teams/teams-settings";
import { LoadingSpinner } from "@/components/loading-spinner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClassValue } from "clsx";
import { NoPermissionAlert } from "@/components/no-permissions-alert";

type Props = {
  team: Team
}

export const TeamSettings = ({ team }: Props) => {

  const user = useUser()
  const roleTeamSettings = useRole('teams', 'update-team-roles', team.id)

  const tabTriggerClassName: ClassValue = 'bg-white data-[state=active]:text-white data-[state=active]:bg-main'

  return ( 
    <React.Fragment>
      {roleTeamSettings.roleLoading ? (
        <LoadingSpinner />
      ): (
        <React.Fragment>
          {(user?.id == team.ownerId || roleTeamSettings.access) ? ( 
            <React.Fragment>

              <Tabs defaultValue="teamTasksSettings" className='w-full bg-transparent p-0'>
      
                <TabsList className='w-full'>
                  <TabsTrigger className={`w-full ${tabTriggerClassName}`} value="teamTasksSettings">Tasks permissions</TabsTrigger>
                  <TabsTrigger className={`w-full ${tabTriggerClassName}`} value="teamProjectsSettings">Projects permissions</TabsTrigger>
                  <TabsTrigger className={`w-full ${tabTriggerClassName}`} value="teamsSettings">Team Permissions</TabsTrigger>
                  <TabsTrigger className={`w-full ${tabTriggerClassName}`} value="teamBoardsSettings">Boards permissions</TabsTrigger>
                  <TabsTrigger className={`w-full ${tabTriggerClassName}`} value="teamMembersSettings">Members permissions</TabsTrigger>
                </TabsList>

                <TabsContent value="teamTasksSettings">
                  <TeamTasksSettings team={team} />
                </TabsContent>

                <TabsContent value="teamProjectsSettings">
                  <TeamsSettings team={team} />
                </TabsContent>

                <TabsContent value="teamsSettings">
                  <TeamProjectsSettings team={team} />
                </TabsContent>

                <TabsContent value="teamBoardsSettings">
                  <TeamBoardsSettings team={team} />
                </TabsContent>

                <TabsContent value="teamMembersSettings">
                  <TeamMembersSettings team={team} />
                </TabsContent>
              </Tabs>
            </React.Fragment>
          ): (
            <NoPermissionAlert actionName="Update team roles & permissions." />
          )}
        </React.Fragment>
      )}
      
    </React.Fragment>
  );
}