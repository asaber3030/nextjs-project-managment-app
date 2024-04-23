"use client";

import Link from "next/link";
import React from "react";

import { useSession } from "next-auth/react";

import { Skeleton } from "@/components/ui/skeleton";
import { GuestLinks } from "./guest-links";
import { AuthLinks } from "./auth-links";

export const Navbar = () => {

  const { data, status } = useSession();

  return (
    <nav className='flex p-4 justify-between items-center bg-main'>
      
      <Link className='text-white first-letter:text-secondaryMain first-letter:font-normal text-xl font-extrabold' href='/'>Platform</Link>

      {status === 'loading' ? (
        <Skeleton className='h-8 w-32' />
      ): (
        <React.Fragment>
          {status === 'authenticated' ? (
            <AuthLinks />
          ): (
            <GuestLinks />
          )}
        </React.Fragment>
      )}
    </nav>
  );
}
 