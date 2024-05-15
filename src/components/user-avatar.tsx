"use client";

import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "./ui/avatar";

type Props = {
  photo: string,
  fallback?: string,
  className?: string
}

export const UserAvatar = ({ className, photo, fallback = 'A' }: Props) => {
  return ( 
    <Avatar className={className}>
      <AvatarImage src={photo} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}