import { Skeleton } from "@/components/ui/skeleton";
import { arr } from "@/lib/utils";

type Props = {
  repeat?: number,
  defaultKey?: string
}

export const TeamSkeleton = ({ repeat = 4, defaultKey }: Props) => {
  return ( 
    <div className='grid grid-cols-1 xl:grid-cols-4 gap-2'>
      {arr(repeat).map((_, idx) => (
        <div className='rounded-md border p-4 shadow-sm' key={`team-skeleton-${idx}-${defaultKey && defaultKey}`}>
          <div className='flex justify-between items-center'>
            <Skeleton className='h-3 w-32' />
            <Skeleton className='h-8 w-16' />
          </div>
          <div className='flex flex-wrap'>
            {arr(5).map((_, idx) => (
              <Skeleton key={`team-skeleton-member-${idx}-${defaultKey && defaultKey}`} className='[&:not(:first-of-type)]:-ml-2 size-10 rounded-full' />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}