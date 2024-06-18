"use client";

import React from "react";

import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { RemoveMemberAction } from "./actions/remove-member-action";
import { ChangeMemberStatusAction } from "./actions/change-member-status-action";
import { ChangeMemberRoleAction } from "./actions/change-member-role";

import { TeamMember } from "@/types";

type Props = { member: TeamMember }

export const MemberActions = ({ member }: Props) => {
  return ( 
    <DropdownMenu>
      <DropdownMenuTrigger><MoreHorizontal className='size-4' /></DropdownMenuTrigger>
      <DropdownMenuContent className='w-[180px]'>
        <React.Fragment>
          <RemoveMemberAction member={member} />
          <ChangeMemberStatusAction member={member} />
          <ChangeMemberRoleAction member={member} />
        </React.Fragment>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}