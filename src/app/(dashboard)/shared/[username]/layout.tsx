import React from "react";

import { getUserByUsername, getUserCountsByUsername } from "@/actions/user-data";
import { notFound } from "next/navigation";

import { AccountSidebar } from "@/app/_components/shared/sidebar";
import { AccountBackground } from "@/app/_components/shared/account-bg";
import { PrivateAccount } from "@/app/_components/shared/private-account";
import { User } from "@/types";

const AccountLayout = async ({ children, params }: { children: React.ReactNode, params: { username: string } }) => {

  const counts = await getUserCountsByUsername(params.username)
  const user = await getUserByUsername(params.username)

  if (!user) return notFound()

  return (
    <div>
      <AccountBackground user={user as User} />
      <div className='xl:flex xl:-translate-y-14 xl:px-8 p-0 mt-4 gap-4'>
        <AccountSidebar counts={counts} user={user as User} />
        {user.private ? (
          <PrivateAccount />
        ): (
          <div className='w-full bg-white rounded-md shadow-sm h-fit'>
            <div className='p-4'>
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 
export default AccountLayout;