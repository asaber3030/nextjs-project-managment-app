"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";

import { diffForHuman } from "@/lib/date";
import { Notification } from "@/types";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type Props = { 
  notification: Notification,
  titleClassName?: ClassValue,
  iconClassName?: ClassValue
}

export const SingleNotification = ({ notification, titleClassName, iconClassName }: Props) => {

  const router = useRouter()

  const { mutateAsRead, mutateAsUnread, mutateDelete } = useNotifications()

  const handleDelete = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    mutateDelete({ id: notification.id })
    router.refresh()
  }

  const handleRead = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    mutateAsRead({ id: notification.id })
    router.refresh()
  }
  const handleUnread = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    mutateAsUnread({ id: notification.id })
    router.refresh()
  }

  return ( 
    <div 
      className={cn("flex gap-4 cursor-pointer select-none justify-between p-2 px-4 rounded-md border border-transparent transition-all hover:bg-secondary hover:shadow-sm hover:border", !notification.isRead && 'bg-secondary border')}
      onClick={() => router.push(notification.url)}
    >
      <div className="flex items-center mt-2 gap-4">

        {!notification.isRead && (
          <div className="size-3 bg-green-600 ring ring-green-500 rounded-full shadow-sm shadow-green-500" />
        )}

        <div className={cn('size-16 bg-gray-200 rounded-full flex items-center justify-center', iconClassName)}>
          <Image src={notification.icon} width={20} height={20} alt='Notification type' />
        </div>

        <div>
          <Link href={notification.url} className={cn('font-medium text-lg', titleClassName)} dangerouslySetInnerHTML={{ __html: notification.title }} />
          <p className='text-xs text-gray-500'>{diffForHuman(notification.sentIn)}</p>
        </div>

      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className='p-2 hover:bg-border rounded-md transition-all h-fit focus:outline-none focus:ring-0'><MoreHorizontal className='size-4 text-gray-500' /></DropdownMenuTrigger>
        <DropdownMenuContent className='w-[250px] max-h-fit h-fit'>
          {!notification.isRead ? (
            <DropdownMenuItem onClick={handleRead}>Mark as read</DropdownMenuItem>
          ): (
            <DropdownMenuItem onClick={handleUnread}>Mark as unread</DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}