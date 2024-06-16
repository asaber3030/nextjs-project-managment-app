import React from "react";

import { Footer } from "../_components/app/footer";

const UnauthenicatedLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-[100vh] flex-col justify-between'>
      {children}
      <Footer />
    </div>
  );
}
 
export default UnauthenicatedLayout;