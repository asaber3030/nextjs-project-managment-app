import Link from "next/link";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CalendarIcon } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { UserAvatar } from "./avatar";

import { User } from "@/types/user";

import { diffForHuman } from "@/lib/date";

type Props = {
  user: User,
  date: Date,
  label?: string
}

export const UserHoverCard = ({ label = 'Joined ', date, user }: Props) => {
  return ( 
    <HoverCard>
        
      <HoverCardTrigger asChild>
        <Avatar>
          <AvatarImage src={user.photo} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>

      <HoverCardContent className="w-80">

        <div className="flex justify-between space-x-4">
          
          <UserAvatar className='size-14' photo={user.photo} />

          <div className="space-y-1 w-full">
            <h4 className="text-lg font-semibold p-0 m-0">{user.name} <Link href='' className='text-xs font-normal hover:underline lowercase'>@{user.name}</Link></h4>
            <p className='text-sm p-0 m-0'>{user.jobTitle}</p>
            
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">{label} {diffForHuman(date)}</span>
            </div>
          </div>
        </div>

      </HoverCardContent>

    </HoverCard>
  );
}