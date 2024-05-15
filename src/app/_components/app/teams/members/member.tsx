import Link from "next/link";

import { UserHoverCard } from "@/app/_components/user/hover-card";
import { TeamMember } from "@/types";
import { MemberActions } from "./member-actions";

import { route } from "@/lib/route";
import { Dot } from "lucide-react";

type Props = { member: TeamMember }

export const Member = ({ member }: Props) => {

  return ( 
    <div className='flex relative border bg-white p-4 pb-8 rounded-sm shadow-sm gap-3 select-none'>
      <UserHoverCard user={member.user} date={member.joinedIn} userURL={route.viewTeamMember(member.teamId, member.userId)} />
      <div>
        <Link href={route.viewTeamMember(member.teamId, member.userId)}>{member.user.name}</Link>
        <p className='text-xs text-gray-500'>{member.user.jobTitle}</p>
      </div>
      <div className='absolute top-2 right-2'>
        <MemberActions member={member} />
      </div>
      <div className='absolute bottom-2 right-2 text-xs text-gray-400 flex items-center gap-1'>
        {member.status}
        <Dot className='size-4' />
        {member.role}
      </div>
    </div>
  );
}