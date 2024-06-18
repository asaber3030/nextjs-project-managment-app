import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import Image from "next/image";

type Props = {
  label?: string
  className?: ClassValue
  imageClassName?: ClassValue
}

export const PrivateContent = ({ label = 'Private.', className }: Props) => {
  return ( 
    <div className={cn('bg-secondary p-4 rounded-md shadow-sm border', className)}>
      <Image src='/defaults/security.svg' alt='Private' width={200} height={200} className={cn('w-[100px] mx-auto my-4')} />
      <h4 className='font-semibold text-lg text-center'>{label}</h4>
    </div>
  );
}