"use client";

import Link from "next/link";

import { ChevronRight, LucideIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode,
  label: string,
  icon: LucideIcon,
  url: string
}
export const SidebarLink = ({ children, label, icon: Icon, url }: Props) => {

  const [open, setOpen] = useState(false)

  if (children) {
    return (
      <div className="flex items-center justify-between">
        <Link href={url} className='font-medium text-sm text-gray-200 items-center flex gap-4 p-2 mx-2 duration-300 rounded-md hover:bg-darkNavbar transition-all w-full'><Icon className='size-5' /> {label}</Link>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger className={cn('p-1 rounded-md hover:bg-darkNavbar', open && 'bg-darkNavbar')}>
            <ChevronRight className={cn(`size-4 text-gray-600 transition-all`, open ? 'rotate-90' : 'rotate-0')} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[200px] top-1/2 right-0'>
            {children}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }
  return ( 
    <Link href={url} className='font-medium text-sm text-gray-200 items-center flex gap-4 p-2 mx-2 duration-300 rounded-md hover:bg-darkNavbar transition-all'><Icon className='size-5' /> {label}</Link>
  );
}