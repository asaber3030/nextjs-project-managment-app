import { Skeleton } from "@/components/ui/skeleton";
import { arr } from "@/lib/utils";

type Props = {
  repeat?: number,
  defaultKey?: string
}

export const SettingsSkeleton = ({ repeat = 4, defaultKey }: Props) => {
  return ( 
    <div className='space-y-4 mt-4'>
      {arr(repeat).map((_, idx) => (
        <div key={`project-skeleton-idx-${idx}-${defaultKey}`}>
          <div className='flex items-center mb-2 gap-2'>
            <Skeleton className='size-1 rounded-full' />
            <Skeleton className='w-20 h-1' />
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex gap-1'>
              <Skeleton className='w-12 h-8' />
              <Skeleton className='w-12 h-8' />
              <Skeleton className='w-12 h-8' />
              <Skeleton className='w-12 h-8' />
            </div>
            <Skeleton className='w-12 h-8' />
          </div>
        </div>
      ))}
    </div>
  );
}