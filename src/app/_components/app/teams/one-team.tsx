"use client";

import { useQuery } from "@tanstack/react-query";
import { getTeam } from "@/actions/user-data";

import { Button } from "@/components/ui/button";
import { Cog, TriangleAlert, UserPlus } from "lucide-react";
import { UserHoverCard } from "../../user/hover-card";

import { User } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { QueryKeys } from "@/lib/query-keys";

type Props = {
  teamId: number
}

export const OneTeam = ({ teamId }: Props) => {

  const query = useQuery({
    queryKey: QueryKeys.team(teamId),
    queryFn: ({ queryKey }) => getTeam(queryKey[2] as number)
  })

  const team = query.data

  return ( 
    <div className='rounded-md shadow-sm border p-4'>

      <section className="flex items-center justify-between">

        <h1 className='bg-gray text-xl'>{team?.name}</h1>
        
        <div className='flex gap-1 flex-wrap'>
          <Link href={`/dashboard/teams/${teamId}`}><Button size='sm' className='h-8 hover:bg-grayMain' variant='ghost'><Cog className='size-4' /></Button></Link>
          <Link href={`/dashboard/teams/${teamId}/invitations`}><Button size='sm' className='h-8 hover:bg-grayMain' variant='ghost'><UserPlus className='size-4' /></Button></Link>
        </div>

      </section>

      {team?.members.length && team?.members.length > 0 ? (
        <section className='flex flex-wrap'>
          {team?.members.slice(0, 7).map((member, idx) => (
            <UserHoverCard date={member.joinedIn} user={member.user as User} />
          ))}
        </section>
      ): (
        <div className='mt-2'>
          <p className='flex gap-3 bg-gray-50 rounded-sm shadow-sm p-3 text-gray-500 mb-3'><TriangleAlert /> No Members added to this team!</p>
          <Button variant='outline' size='sm'><UserPlus className='size-4' /> Invite Members</Button>
        </div>
      )}
    </div>
  );
}