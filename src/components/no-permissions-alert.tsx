import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  label?: string,
  className?: string,
  actionName?: string
}

export const NoPermissionAlert = ({ label = "You don't have permissions to this action.", actionName = '', className }: Props) => {
  return ( 
    <div className={cn('bg-secondary p-4 rounded-md shadow-sm flex items-center gap-4', className)}>
      <Image src="/defaults/access-card.svg" alt='Access' width={40} height={40} />
      <div>
        <p className='text-lg text-gray-700 font-medium'>{label}</p>
        {actionName && (
          <p className='text-sm'>Permission name <b className='font-semibold'>({actionName})</b></p>
        )}
      </div>
    </div>
  );
}