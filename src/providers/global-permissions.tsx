"use client";

import React, { createContext } from "react";
import { GlobalPermissionsType } from "@/types";

export const GlobalPermissionsContext = createContext<GlobalPermissionsType>({
  hasMailSystem: false,
  hasAnalytics: false,
  hasCharts: false,
  canDirectAdd: false,
  canCreateMorePersonalProjects: false,
  canCreateMorePersonalTasks: false,
  canCreateMorePersonalBoards: false,
  canCreateMoreTeams: false
})

type Props = { 
  value: GlobalPermissionsType,
  children: React.ReactNode
}

export const GlobalPermissionsProivder = ({ children, value }: Props) => {
  return ( 
    <GlobalPermissionsContext.Provider value={value}>
      {children}
    </GlobalPermissionsContext.Provider>
  );
}