import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

type Props = {
  label?: string,
  className?: string
}
export const LoadingSpinner = ({ label = 'Loading...', className }: Props) => {
  return ( 
    <div className={cn('flex items-center gap-3 bg-white rounded-sm shadow-sm p-2 font-bold text-xs', className)}>
      <Loader className='size-4 animate-spin' />
      <span>{label}</span>
    </div>
  );
}