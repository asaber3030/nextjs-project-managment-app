"use client"

import Link from "next/link"

import { useState } from "react"
import { usePathname } from "next/navigation"

import { ChevronRight, LucideIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils"

type Props = {
  children?: React.ReactNode
  label: string
  icon: LucideIcon
  url: string
}

export const SidebarLink = ({ children, label, icon: Icon, url }: Props) => {
  const [open, setOpen] = useState(false)

  const pathname = usePathname()

  if (children) {
    return (
      <div className="flex items-center justify-between mb-0.5">
        <Link
          href={url}
          className={cn(
            "font-medium text-sm text-gray-200 items-center flex gap-4 p-2 px-4 mx-2 duration-300 rounded-md hover:bg-lightSidebar transition-all w-full",
            pathname.endsWith(url) && "bg-lightSidebar text-white hover:bg-lightSidebar"
          )}
        >
          <Icon className="size-5" /> {label}
        </Link>

        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger
            className={cn("p-1 rounded-md hover:bg-lightSidebar", open && "bg-darkNavbar")}
          >
            <ChevronRight
              className={cn(`size-4 text-gray-600 transition-all`, open ? "rotate-90" : "rotate-0")}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[290px] top-1/2 right-0">
            {children}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }
  return (
    <Link
      href={url}
      className={cn(
        "mb-0.5 font-medium text-sm text-gray-200 items-center flex gap-4 p-2 px-4 ml-2 mr-8 duration-300 rounded-md hover:bg-darkNavbar transition-all w-full",
        pathname.endsWith(url) && "bg-black/50 text-white hover:bg-black/50"
      )}
    >
      <Icon className="size-5" />
      {label}
    </Link>
  )
}

export const SidebarBadge = ({ children, label, icon: Icon, url }: Props) => {
  const pathname = usePathname()
  return (
    <Link
      href={url}
      className={cn(
        "mb-0.5 font-medium text-sm text-gray-200 items-center flex justify-between p-2 px-4 mx-2 duration-300 rounded-md hover:bg-darkNavbar transition-all w-full",
        pathname.endsWith(url) && "bg-black/50 text-white hover:bg-black/50"
      )}
    >
      <span className="flex items-center gap-4">
        <Icon className="size-5" /> {label}
      </span>
      {children}
    </Link>
  )
}
