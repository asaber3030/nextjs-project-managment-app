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
        <Link href={url} className='font-bold text-sm text-gray-600 items-center flex gap-4 p-2 mx-2 duration-300 rounded-md hover:bg-[#e9e9e9] transition-all w-full'><Icon /> {label}</Link>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger className={cn('p-1 rounded-md hover:bg-[#e9e9e9]', open && 'bg-[#e9e9e9]')}>
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
    <Link href={url} className='font-bold text-sm text-gray-600 items-center flex justify-between p-2 m-2 rounded-md hover:bg-[#e9e9e9]'>
      <Icon />
      {label}
    </Link>
  );
}