"use client";

import React, { createContext } from "react";
import { Plan } from "@/types";

export const PlansContext = createContext<Plan[]>([])

type Props = { 
  value: Plan[],
  children: React.ReactNode
}

export const PlansProvider = ({ children, value }: Props) => {
  return ( 
    <PlansContext.Provider value={value}>
      {children}
    </PlansContext.Provider>
  );
}