"use client"

import { route } from "@/lib/route"
import { cn } from "@/lib/utils"
import { Team } from "@/types"
import { Check, Dot } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = {
  team: Team
}

export const SidebarJoinedTeamLink = ({ team }: Props) => {
  const pathname = usePathname()

  return (
    <Link
      href={route.assignedTeamTasks(team.id)}
      className={cn(
        "p-1 px-4 border justify-between bg-white rounded-md shadow-sm text-lg flex gap-1 items-center hover:bg-secondary transition-all hover:border-secondary",
        pathname?.includes(`teams/${team.id}`) && "hover:bg-gray-200 bg-gray-200 text-black"
      )}
    >
      <div className="flex items-center">
        <span>Team</span>
        <Dot className="size-4" />
        <span className="font-medium">{team.name}</span>
      </div>
      {pathname?.includes(`teams/${team.id}`) && <Check className="size-4" />}
    </Link>
  )
}
