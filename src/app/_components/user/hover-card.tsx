"use client"

import Link from "next/link"

import { CalendarIcon } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { UserAvatar } from "./avatar"

import { User } from "@/types"

import { cn } from "@/lib/utils"
import { route } from "@/lib/route"
import { diffForHuman } from "@/lib/date"
import { ClassValue } from "clsx"
import { useUser } from "@/hooks"

type Props = {
  user: User
  date: Date
  userURL?: string
  label?: string
  className?: ClassValue
}

export const UserHoverCard = ({ label = 'Joined ', userURL, date, user, className }: Props) => {

  const mainURL = userURL ? userURL : route.userProfile(user.username)
  const current = useUser()

  return ( 
    <HoverCard openDelay={100}>
        
      <HoverCardTrigger asChild>
        <Avatar className={cn(className)}>
          <AvatarImage src={user.photo} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>

      <HoverCardContent className="w-80">

        <div className="flex justify-between space-x-4">
          
          <UserAvatar className='size-14' photo={user.photo} />

          <div className="space-y-1 w-full">
          
            <Link href={mainURL} className="text-lg p-0 font-medium hover:underline">{user.name} {current?.id === user.id && <span className='text-gray-500 text-sm'>(Me)</span>}</Link>
            <p className='text-xs p-0 m-0'>{user.jobTitle}</p>
            
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">{label} {diffForHuman(date)}</span>
            </div>

          </div>

        </div>

      </HoverCardContent>

    </HoverCard>
  )
}