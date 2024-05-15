import React, { useDeferredValue } from "react";

import { AccountSidebar } from "@/app/_components/account/sidebar";
import { AccountBackground } from "@/app/_components/account/account-bg";
import { AccountLinks } from "@/app/_components/account/links";
import { getUserCounts } from "@/actions/user-data";

const AccountLayout = async ({ children }: { children: React.ReactNode }) => {

  const counts = await getUserCounts()

  return (
    <div>
      <AccountBackground />

      <div className='xl:flex xl:-translate-y-14 xl:px-8 p-0 mt-4 gap-4'>
        <AccountSidebar counts={counts} />
        <div className='w-full bg-white rounded-md shadow-sm h-fit'>
          <AccountLinks />
          <div className='p-4'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default AccountLayout;