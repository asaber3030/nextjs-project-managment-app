"use client";

import { Notification } from "@/types";
import React, { createContext } from "react";

type Props = {
  value: Notification[],
  children: React.ReactNode
}

export const NotificationsContext = createContext<Notification[]>([])

export const NotificationsProvider = ({ children, value }: Props) => {
  return ( 
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}