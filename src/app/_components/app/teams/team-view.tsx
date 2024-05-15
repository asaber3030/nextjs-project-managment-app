"use client";

import Link from "next/link";

import { Team, TeamMember } from "@/types"

import { FolderPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DisplayTeamMembers } from "./team-members"
import { DisplayTeamAnalytics } from "./team-analytics"
import { DisplayTeamProjects } from "./team-projects"
import { TeamHeaderSection } from "./team-section-header";
import { InviteButton } from "./members/invite-button";
import { DirectAddMemberButton } from "./members/direct-add-button";

import { route } from "@/lib/route";
import { Render } from "@/components/render";
import { useRole } from "@/hooks/useRoles";
import { useUser } from "@/hooks";

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

export const DisplayTeamInfo = ({ analytics, team }: Props) => {

  const user = useUser()

  const roleAddMembers = useRole('members', 'direct-add-members', team.id)
  const roleInviteMembers = useRole('members', 'invite-members', team.id)
  const roleAddProjects = useRole('projects', 'add-projects', team.id)

  return (
    <div className='space-y-4'>
      
      <TeamHeaderSection label={`${team.name}'s Dashboard`} icon={Users}>

        <Render 
          render={<Link href={route.addTeamProject(team?.id)}><Button variant='outline'><FolderPlus className='size-4' /> Create Project</Button></Link>}
          fetched={roleAddProjects.roleFetched}
          loading={roleAddProjects.roleLoading}
          access={roleAddProjects.access || user?.id === team?.ownerId}
        />

        <Render 
          render={<DirectAddMemberButton team={team} />}
          fetched={roleAddMembers.roleFetched}
          loading={roleAddMembers.roleLoading}
          access={roleAddMembers.access || user?.id === team?.ownerId}
        />

        <Render 
          render={<InviteButton team={team} />}
          fetched={roleInviteMembers.roleFetched}
          loading={roleInviteMembers.roleLoading}
          access={roleInviteMembers.access || user?.id === team?.ownerId}
        />

      </TeamHeaderSection>

      <DisplayTeamMembers members={team?.members as TeamMember[]} teamId={team.id} />
      <DisplayTeamAnalytics analytics={analytics} team={team} />
      <DisplayTeamProjects team={team} teamId={team.id} />
    </div>
  );
}