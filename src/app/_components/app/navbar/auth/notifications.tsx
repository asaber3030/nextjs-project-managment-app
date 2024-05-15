"use client";

import { useContext } from "react";

import { Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SingleNotification } from "@/app/_components/user/notification";

import { NotificationsContext } from "@/providers/notifications";


export const NotificationsDropdown = () => {

  const notifications = useContext(NotificationsContext)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='text-white p-0.5 py-0 px-2 hover:bg-secondaryMain transition-all rounded-md'><Bell className='size-4' /></DropdownMenuTrigger>
      <DropdownMenuContent className='px-4 w-[600px] max-h-[600px] overflow-y-auto'>
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications?.map((notitfication) => (
          <SingleNotification iconClassName="size-12" titleClassName='text-sm' key={`dropdown-notification-${notitfication.id}`} notification={notitfication} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}