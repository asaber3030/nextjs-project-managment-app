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
import { SettingsSkeleton } from "@/app/_components/skeleton/settings-skeleton";

type Props = {
  team: Team
}

export const TeamSettings = ({ team }: Props) => {

  const user = useUser()
  const roleTeamSettings = useRole('teams', 'update-team-roles', team.id)

  return ( 
    <React.Fragment>
      {(user?.id == team.ownerId || roleTeamSettings.access) && ( 
        <React.Fragment>
         <Title label="Team Settings" parentClassName='mb-4' hasBottomBorder />
          <div className='grid grid-cols-1 xl:grid-cols-3 gap-2'>
            <TeamsSettings team={team} />
            <TeamTasksSettings team={team} />
            <TeamProjectsSettings team={team} />
            <TeamBoardsSettings team={team} />
            <TeamMembersSettings team={team} />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}