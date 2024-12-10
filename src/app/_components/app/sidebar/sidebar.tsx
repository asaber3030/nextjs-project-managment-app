"use client"

import React from "react"

import { useRouter } from "next/navigation"

import { route } from "@/lib/route"

import {
  CheckCheck,
  CheckCircle,
  Cog,
  DollarSign,
  Folder,
  LucideHome,
  User,
  UserPlus,
  Users
} from "lucide-react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { SubscriptionPlanCardSidebar } from "./subscription-plan-user"
import { SidebarHeader } from "./sidebar-header"
import { SidebarBadge, SidebarLink } from "./sidebar-link"
import { CreateTeamButton } from "../teams/create-team-button"
import { CreatePersonalTask } from "../personal/tasks/actions/create"

import { Status } from "@prisma/client"
import { Subscription } from "@/types"
import { SidebarAccount } from "./account-item"

type Props = {
  subscription: Subscription
  countTasks: number
  stats: {
    pending: number
    todo: number
    done: number
  }
}

export const UserSidebar = ({ subscription, countTasks, stats }: Props) => {
  const router = useRouter()

  return (
    <aside className="bg-sidebar hidden flex-col xl:flex xl:justify-between h-full xl:fixed left-0 top-0 w-[345px] border-r border-r-secondaryMain">
      <div>
        <SidebarHeader />

        <section className="p-2 pr-4">
          <SidebarLink label="Dashboard" icon={LucideHome} url={route.dashboard()} />
          <SidebarBadge label="Assigned Tasks" icon={CheckCircle} url={route.assignedTasks()}>
            {countTasks > 0 && (
              <Badge variant="outlinePrimary" className="text-xs rounded-full">
                {countTasks} pending
              </Badge>
            )}
          </SidebarBadge>

          <SidebarLink label="Teams" icon={Users} url={route.teams()}>
            <CreateTeamButton
              className="border-none w-full hover:bg-secondary text-left justify-start transition-all bg-transparent"
              label="Create Team"
            />
          </SidebarLink>

          <SidebarLink label="Personal Projects" icon={Folder} url={route.personalProjects()}>
            <DropdownMenuItem onClick={() => router.push(route.createPersonalProject())}>
              Create
            </DropdownMenuItem>
          </SidebarLink>

          <SidebarLink label="Personal Tasks" icon={CheckCheck} url={route.personalTasks()}>
            <CreatePersonalTask
              label="Create"
              className="bg-transparent w-full rounded-md text-sm flex gap-2 p-1 px-2 h-8 justify-start transition-all hover:bg-accent"
              iconClassName="size-4"
            />
            <div className="flex gap-1 flex-wrap mt-2 justify-center">
              <Badge>{stats.pending} pending</Badge>
              <Badge>{stats.todo} todo</Badge>
              <Badge>{stats.done} completed</Badge>
            </div>
          </SidebarLink>

          <SidebarLink label="Invitations" icon={UserPlus} url={route.myInvitations()}>
            <DropdownMenuItem onClick={() => router.push(route.myInvitations())}>
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(route.myInvitations(Status.Accepted))}>
              Accpeted
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(route.myInvitations(Status.Refused))}>
              Refused
            </DropdownMenuItem>
          </SidebarLink>

          <SidebarAccount />

          <SidebarLink
            label="Subscriptions"
            icon={DollarSign}
            url={route.account("subscriptions")}
          />

          <SidebarLink label="Settings" icon={Cog} url={route.account("settings")} />
        </section>
      </div>

      <SubscriptionPlanCardSidebar subscription={subscription} />
    </aside>
  )
}
