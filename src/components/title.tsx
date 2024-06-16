import React from "react";

import { cn } from "@/lib/utils";
import { Hash, LucideIcon } from "lucide-react";

type Props = {
  label: React.ReactNode,
  labelClassName?: string,
  children?: React.ReactNode,
  hasBottomBorder?: boolean,
  parentClassName?: string,
  actionsClassName?: string,
  icon?: LucideIcon
  disableIcon?: boolean
}

export const Title = ({ label, disableIcon = false, labelClassName, children, hasBottomBorder, actionsClassName, parentClassName, icon: Icon = Hash }: Props) => {
  return ( 
    <div className={cn(parentClassName, hasBottomBorder && 'pb-2 border-b', 'xl:flex justify-between items-center')}>
      <h1 className={cn(labelClassName, 'text-xl mb-3 xl:mb-0 font-medium flex items-center gap-2')}>{!disableIcon && <Icon className='size-5' />} {label}</h1>
      <div className={cn('flex gap-1', actionsClassName)}>
        {children}
      </div>
    </div>
  );
}