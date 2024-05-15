import { cn } from "@/lib/utils";
import { Dot, NotebookText } from "lucide-react";
import Link from "next/link";

type Props = {
  parentClassName?: string,
  label?: string,
  plansURL?: string,
  upgradeURL?: string,
  displayDot?: boolean,
  actionsClassName?: string
}

export const UpgradePlanAlert = ({ 
  parentClassName,
  actionsClassName,
  displayDot = true,
  label = 'Upgrade required'
}: Props) => {
  return ( 
    <div className={cn(parentClassName, 'p-2 px-4 rounded-md text-center bg-secondary border xl:flex gap-3 items-center')}>
      <span className='font-semibold flex gap-1 items-center'><NotebookText className='mr-2 xl:size-4 size:9 hidden xl:block' /> {label}</span> 
      <div className={cn('flex mt-4 xl:mt-0 items-center justify-center gap-0.5', actionsClassName)}>
        <Link className='block text-blue-700 hover:underline' href={''}>Upgrade</Link>
        {displayDot && (
          <Dot />
        )}
        <Link className='block text-blue-700 hover:underline' href={''}>View Options</Link>
      </div>
    </div>
  );
}