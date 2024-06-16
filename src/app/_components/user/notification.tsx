"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";

import { cn } from "@/lib/utils";
import { diffForHuman } from "@/lib/date";

import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { ClassValue } from "clsx";
import { Notification } from "@/types";

type Props = { 
  notification: Notification,
  titleClassName?: ClassValue,
  iconClassName?: ClassValue
}

export const SingleNotification = ({ notification, titleClassName, iconClassName }: Props) => {

  const router = useRouter()

  const { mutateAsRead, mutateAsUnread, mutateDelete, refetchNotifications } = useNotifications()

  const handleDelete = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    mutateDelete({ id: notification.id })
    refetchNotifications()
  }

  const handleRead = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    mutateAsRead({ id: notification.id })
    refetchNotifications()
  }

  const handleUnread = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    mutateAsUnread({ id: notification.id })
    refetchNotifications()
  }
  
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    handleRead(event)
    router.push(notification.url)
  }

  return ( 
    <div 
      className={cn(
        "flex gap-4 mb-1 cursor-pointer select-none justify-between p-2 px-4 rounded-md border border-transparent transition-all hover:bg-secondary hover:shadow-sm hover:border", !notification.isRead && 'bg-secondary border',
        notification.isRead && "hover:bg-transparent"  
      )}
      onClick={handleClick}
    >
      <div className="flex items-center mt-2 gap-4">

        <div className={cn('size-12 bg-gray-200 rounded-lg flex items-center justify-center', iconClassName)}>
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
            <DropdownMenuItem className='h-7' onClick={handleRead}>Mark as read</DropdownMenuItem>
          ): (
            <DropdownMenuItem className='h-7' onClick={handleUnread}>Mark as unread</DropdownMenuItem>
          )}
          <DropdownMenuItem className='h-7' onClick={handleDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}