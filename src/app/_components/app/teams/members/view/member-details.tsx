"use client";

import { BookText, Calendar, CheckCheck, Clock, Folder, HashIcon, Mail, User, Users2, Workflow } from "lucide-react";
import { UserAvatar } from "@/components/user-avatar";
import { diffForHuman } from "@/lib/date";
import { TeamMember } from "@/types";
import { Button } from "@/components/ui/button";

type Props = { member: TeamMember }

export const MemberDetails = ({ member }: Props) => {
  return ( 
    <div className='pt-4 xl:justify-start items-center justify-center grid xl:grid-cols-8 grid-cols-1 gap-y-2'>
      
      <section className='text-center px-4 col-span-2 flex flex-col justify-center items-center'>
        <UserAvatar className='mx-auto' photo={member.user.photo} />
        <h2 className='text-lg font-semibold capitalize'>{member.user.name}</h2>
        <p className='text-xs text-gray-500'>{member.user.jobTitle}</p>
        <div className='flex gap-1 mt-2'>
          <Button variant='outline' className='text-gray-600 px-4'>Update</Button>
          <Button variant='outline' className='text-gray-600 px-4'>Change Status</Button>
        </div>
      </section>

      <section className='px-1 col-span-3'>
        <ul>
          <li className='flex items-center justify-between gap-4 py-1 px-4 bg-secondary rounded-md mb-1 border text-sm'>
            <p className='flex gap-2 items-center font-medium'><Calendar className='size-4' /> Joined</p>
            <p className='text-gray-400'>{diffForHuman(member.joinedIn)}</p>
          </li>

          <li className='flex items-center justify-between gap-4 py-1 px-4 bg-secondary rounded-md mb-1 border text-sm'>
            <p className='flex gap-2 items-center font-medium'><CheckCheck className='size-4' /> Status</p>
            <p className='text-gray-400'>{member.status}</p>
          </li>
          <li className='flex items-center justify-between gap-4 py-1 px-4 bg-secondary rounded-md mb-1 border text-sm'>
            <p className='flex gap-2 items-center font-medium'><HashIcon className='size-4' /> Membership ID</p>
            <p className='text-gray-400'>{member.id}</p>
          </li>
          <li className='flex items-center justify-between gap-4 py-1 px-4 bg-secondary rounded-md mb-1 border text-sm'>
            <p className='flex gap-2 items-center font-medium'><Users2 className='size-4' /> Team ID</p>
            <p className='text-gray-400'>{member.teamId}</p>
          </li>
          <li className='flex items-center justify-between gap-4 py-1 px-4 bg-secondary rounded-md mb-1 border text-sm'>
            <p className='flex gap-2 items-center font-medium'><Folder className='size-4' /> Team Name</p>
            <p className='text-gray-400'>{member.team.name}</p>
          </li>
        </ul>
      </section>

      <section className='px-1 col-span-3'>
        <ul>
          <li className='flex items-center justify-between gap-4 py-1 px-4 bg-secondary rounded-md mb-1 border text-sm'>
            <p className='flex gap-2 items-center font-medium'><User className='size-4' /> Username</p>
            <p className='text-gray-400'>@{member.user.username}</p>
          </li>

          <li className='flex items-center justify-between gap-4 py-1 px-4 bg-secondary rounded-md mb-1 border text-sm'>
            <p className='flex gap-2 items-center font-medium'><BookText className='size-4' /> Full-Name</p>
            <p className='text-gray-400'>{member.user.name}</p>
          </li>
          <li className='flex items-center justify-between gap-4 py-1 px-4 bg-secondary rounded-md mb-1 border text-sm'>
            <p className='flex gap-2 items-center font-medium'><Mail className='size-4' /> Email Address</p>
            <p className='text-gray-400'>{member.user.email}</p>
          </li>
          <li className='flex items-center justify-between gap-4 py-1 px-4 bg-secondary rounded-md mb-1 border text-sm'>
            <p className='flex gap-2 items-center font-medium'><Workflow className='size-4' /> Job Title</p>
            <p className='text-gray-400'>{member.user.jobTitle}</p>
          </li>
          <li className='flex items-center justify-between gap-4 py-1 px-4 bg-secondary rounded-md mb-1 border text-sm'>
            <p className='flex gap-2 items-center font-medium'><Clock className='size-4' /> Created in</p>
            <p className='text-gray-400'>{diffForHuman(member.team.createdAt)}</p>
          </li>
        </ul>
      </section>
    </div>
  );
}