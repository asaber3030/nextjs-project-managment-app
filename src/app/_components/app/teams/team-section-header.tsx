import { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
  children?: React.ReactNode,
  label: string,
  icon: LucideIcon
}
export const TeamHeaderSection = ({ children, icon: Icon, label }: Props) => {
  return ( 
    <header className='xl:flex xl:justify-between items-center mb-4 pb-2 border-b'>
      <h1 className='flex text-xl font-semibold items-center gap-2'><Icon className='size-6' /> {label}</h1>
      <div className='flex gap-1'>
        {children}
      </div>
    </header>
  );
}