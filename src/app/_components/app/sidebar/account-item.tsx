"use client"

import { route } from "@/lib/route"
import { User } from "lucide-react"
import { SidebarLink } from "./sidebar-link"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export const SidebarAccount = () => {
  const router = useRouter()

  return (
    <SidebarLink label="Account" icon={User} url={route.account()}>
      <DropdownMenuItem onClick={() => router.push(route.account("settings"))}>
        Change Password
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => router.push(route.account("picture"))}>
        Change Profile picture
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => router.push(route.account("teams"))}>Teams</DropdownMenuItem>
      <DropdownMenuItem onClick={() => router.push(route.account("projects"))}>
        Projects
      </DropdownMenuItem>
    </SidebarLink>
  )
}
