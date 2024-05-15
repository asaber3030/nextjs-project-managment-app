"use client";

import React, { createContext } from "react";
import { TeamProjectPermissionsType } from "@/types";

export const TeamProjectPermissionsContext = createContext<TeamProjectPermissionsType>({
  canCreateMoreBoards: false,
  canCreateMoreTasks: false,
})

type Props = { 
  value: TeamProjectPermissionsType,
  children: React.ReactNode
}

export const TeamProjectPermissionsProvider = ({ children, value }: Props) => {
  return ( 
    <TeamProjectPermissionsContext.Provider value={value}>
      {children}
    </TeamProjectPermissionsContext.Provider>
  );
}