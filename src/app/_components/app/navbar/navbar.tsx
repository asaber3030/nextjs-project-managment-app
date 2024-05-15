"use client";

import Link from "next/link";
import React from "react";

import { useSession } from "next-auth/react";

import { Skeleton } from "@/components/ui/skeleton";
import { GuestLinks } from "./guest-links";
import { AuthContainer } from "./auth/container";

export const Navbar = () => {

  const { data, status } = useSession();

  return (
    <nav className='flex p-4 px-6 justify-between items-center bg-[#1d1f20]'>
      <Link className='text-white first-letter:text-secondaryMain first-letter:font-normaltext-xl font-extrabold' href='/'>Platform</Link>
      
      {status === 'loading' ? (
        <Skeleton className='h-8 w-32' />
      ): (
        <React.Fragment>
          {status === 'authenticated' ? (
            <AuthContainer />
          ): (
            <GuestLinks />
          )}
        </React.Fragment>
      )}
    </nav>
  );
}
 