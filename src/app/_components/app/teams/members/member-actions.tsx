"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react";
import { RemoveMemberAction } from "./actions/remove-member-action";
import { ChangeMemberStatusAction } from "./actions/change-member-status-action";
import { TeamMember } from "@/types";
import { ChangeMemberRoleAction } from "./actions/change-member-role";
import { useUser } from "@/hooks";
import { useRole } from "@/hooks/useRoles";
import { useParams } from "next/navigation";
import { useTeam } from "@/hooks/useTeams";
import React from "react";
import { LoadingSpinner } from "@/components/loading-spinner";

type Props = { member: TeamMember }

export const MemberActions = ({ member }: Props) => {

  const { teamId: stringId }: { teamId: string } = useParams()

  const teamId = Number(stringId)
  const user = useUser()

  const { team, teamLoading } = useTeam(teamId)

  const roleRemoveMember = useRole('members', 'delete-members', teamId)
  const roleChangeMemberStatus = useRole('members', 'change-member-status', teamId)
  const roleChangeMemberRole = useRole('members', 'change-member-role', teamId)

  return ( 
    <DropdownMenu>
      <DropdownMenuTrigger><MoreHorizontal className='size-4' /></DropdownMenuTrigger>
      <DropdownMenuContent className='w-[180px]'>
        {(teamLoading || roleRemoveMember.roleLoading || roleChangeMemberRole.roleLoading || roleChangeMemberStatus.roleLoading) ? (
          <LoadingSpinner />
        ): (
          <React.Fragment>
            {(roleRemoveMember.access || team?.ownerId === user?.id) && (
              <RemoveMemberAction member={member} />
            )}
            {(roleChangeMemberStatus.access || team?.ownerId === user?.id) && (
              <ChangeMemberStatusAction member={member} />
            )}
            {(roleChangeMemberRole || team?.ownerId === user?.id) && (
              <ChangeMemberRoleAction member={member} />
            )}
          </React.Fragment>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}