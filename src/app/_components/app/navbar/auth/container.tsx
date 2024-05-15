"use client";

import React from "react";

import { SearchNavbarDropdown } from "./search";
import { AppLinksNavbarDropdown } from "./app";
import { CreateHelperNavbarDropdown } from "./create-helper";
import { UserNavbarDropdown } from "./user-dropdown";
import { NotificationsDropdown } from "./notifications";

export const AuthContainer = () => {

  return ( 
    <div className='flex gap-4'>

      <SearchNavbarDropdown />

      <AppLinksNavbarDropdown />

      <CreateHelperNavbarDropdown />

      <NotificationsDropdown />

      <UserNavbarDropdown />
      
    </div>
  );
}