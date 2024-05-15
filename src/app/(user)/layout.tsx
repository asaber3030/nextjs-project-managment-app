import React from "react";

import { Footer } from "../_components/app/footer";

const UnauthenicatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      {children}
      <Footer />
    </React.Fragment>
  );
}
 
export default UnauthenicatedLayout;