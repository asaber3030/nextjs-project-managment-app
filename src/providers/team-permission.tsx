"use client";

import React, { createContext } from "react";
import { TeamPermissionsType } from "@/types";

export const TeamPermissionsContext = createContext<TeamPermissionsType>({
  canCreateMoreTeamProjects: false,
  canAddMoreTeamMembers: false,
})

type Props = { 
  value: TeamPermissionsType,
  children: React.ReactNode
}

export const TeamPermissionsProvider = ({ children, value }: Props) => {
  return ( 
    <TeamPermissionsContext.Provider value={value}>
      {children}
    </TeamPermissionsContext.Provider>
  );
}