import React from "react";
import UserSidebar from "../_components/app/sidebar/sidebar";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className='flex'>
      <UserSidebar />
      <div className='xl:pl-[372px] pr-[22px] py-[22px] w-full px-[22px]'>
        {children}
      </div>
    </div>
  );
}
 
export default AuthenticatedLayout;