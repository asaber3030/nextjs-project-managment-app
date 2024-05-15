"use client";

import React, { createContext } from "react";
import { User } from "@/types";

export const UserDataContext = createContext<User>({
  id: 0,
  username: '',
  displayName: '',
  phone: 0,
  city: '',
  name: '',
  email: '',
  directCode: '',
  jobTitle: '',
  planId: 1,
  photo: '',
  bgCover: '',
  showDetails: false,
  private: false,
  plan: null,
  allowUsingDirectCode: false,
  updatedAt: new Date(),
  createdAt: new Date()
})

type Props = { 
  value: User,
  children: React.ReactNode
}

export const UserDataProvider = ({ children, value }: Props) => {
  return ( 
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}