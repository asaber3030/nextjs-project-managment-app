"use client";

import { useContext } from "react";

import { Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SingleNotification } from "@/app/_components/user/notification";

import { NotificationsContext } from "@/providers/notifications";
import { EmptyState } from "@/components/empty-state";
import React from "react";


export const NotificationsDropdown = () => {

  const notifications = useContext(NotificationsContext)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='text-white p-0.5 py-0 px-2 hover:bg-secondaryMain transition-all rounded-md'><Bell className='size-4' /></DropdownMenuTrigger>
      <DropdownMenuContent className='w-[600px] max-h-[600px] overflow-y-auto'>
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications?.length === 0 ? (
          <EmptyState title="No notifications." />
        ): (
          <React.Fragment>
            {notifications?.map((notitfication) => (
              <SingleNotification iconClassName="size-12" titleClassName='text-sm' key={`dropdown-notification-${notitfication.id}`} notification={notitfication} />
            ))}
          </React.Fragment>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}