"use client"

import Link from "next/link"
import Image from "next/image"

import { useContext } from "react"

import { Button } from "@/components/ui/button"
import { Camera, Clipboard, Share } from "lucide-react"

import { UserDataContext } from "@/providers/user-data-provider"

import { route } from "@/lib/route"

type Props = {
  counts: {
    tasks: number
    boards: number
    teams: number
    projects: number
  }
}

export const AccountSidebar = ({ counts }: Props) => {
  
  const user = useContext(UserDataContext)

  return ( 
    <div className='xl:w-[500px] w-full mb-4 bg-white p-2 rounded-md shadow-sm h-fit'>
      
      <div className='w-fit mx-auto my-4'>
        <div className='relative'>
          <Image src={user?.photo} alt='Me' width={200} height={200} className='relative rounded-full overflow-hidden w-[120px] h-[120px] object-cover mx-auto' />
          <Link href={route.accountPictures()} className='size-7 absolute right-5 bottom-0 bg-black outline p-1 text-white rounded-full flex items-center justify-center'><Camera className='size-4' /></Link>
        </div>
      
        <div className='text-center mt-3'>
          <h1 className='text-lg font-medium'>{user?.displayName}</h1>
          <p className='text-gray-400 text-xs'>{user?.jobTitle}</p>
        </div>
      </div>

      <ul className='divide-y px-4'>
        <li className='py-2 flex justify-between items-center'><span>Projects</span> <span className='p-1 rounded-sm text-[10px] bg-green-300'>{counts.projects}</span></li>
        <li className='py-2 flex justify-between items-center'><span>Teams</span> <span className='p-1 rounded-sm text-[10px] bg-yellow-300'>{counts.teams}</span></li>
        <li className='py-2 flex justify-between items-center'><span>Tasks</span> <span className='p-1 rounded-sm text-[10px] bg-red-300'>{counts.tasks}</span></li>
        <li className='py-2 flex justify-between items-center'><span>Boards</span> <span className='p-1 rounded-sm text-[10px] bg-blue-300'>{counts.boards}</span></li>
      </ul>

      <div className='px-4 mt-4 flex gap-1'>
        <Button variant='outline' className='w-full flex-1 text-xs'><Share className='size-4 text-gray-400' /> Share</Button>
        <Button variant='outline' className='w-full flex-1 text-xs'><Clipboard className='size-4 text-gray-400' /> Copy Profile URL</Button>
      </div>
      
    </div>
  )
}