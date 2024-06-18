"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { route } from "@/lib/route";
import { TeamMember } from "@/types";
import { revalidatePath } from "next/cache";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

type Props = {
  members: TeamMember[]
}

export const SearchBoardsByMembers = ({ members }: Props) => {

  const searchParams = useSearchParams()
  const params: { teamId: string } = useParams()
  const owner = searchParams.get('owner')
  const router = useRouter()

  const [filter, setFilter] = useState(owner)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (filter) {
      router.push(route.viewTeamBoards(+params.teamId) + `?owner=${filter}`)
      return
    }
  }

  return ( 
    <form className='flex gap-2' onSubmit={onSubmit}>

      <Select defaultValue={filter ?? ''} name='owner' onValueChange={(value) => setFilter(value)}>

        <SelectTrigger className='w-[300px]'>
          <SelectValue placeholder="Select a member to filter." />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value={' '}>No User</SelectItem>
          {members.map((member) => (
            <SelectItem key={`select-member-idx-${member.id}`} value={`${member.userId}`}>
              <p className='flex gap-2 items-center'>
                <span>{member.user.name}</span>
                <span className='text-xs text-gray-500'>@{member.user.username}</span>
              </p>
            </SelectItem>
          ))}
        </SelectContent>

      </Select>
      
      <Button variant='outline' size='sm' className='h-9'>Find</Button>

    </form>
  );
}