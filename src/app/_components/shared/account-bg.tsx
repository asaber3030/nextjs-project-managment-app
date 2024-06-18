"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"
import { User } from "@/types"

export const AccountBackground = ({ user }: { user: User }) => {

  return ( 
    <div className={cn('w-full h-[200px] rounded-lg relative overflow-hidden', !user?.bgCover && 'bg-blue-600')}>
      {user.bgCover && (
        <Image src={user.bgCover} alt='BG' layout="fill" className='z-1 max-w-full max-h-full absolute object-cover rounded-md' />
      )}
    </div>
  );
}