import { Skeleton } from "@/components/ui/skeleton";
import { arr } from "@/lib/utils";

type Props = {
  repeat?: number,
  defaultKey?: string
}

export const TaskSkeleton = ({ repeat = 4, defaultKey }: Props) => {
  return ( 
    <div className='grid grid-cols-1 xl:grid-cols-3 gap-2'>
      {arr(repeat).map((_, idx) => (
        <div className='rounded-md border flex flex-col gap-y-4 p-4 shadow-sm' key={`task-skeleton-${idx}-${defaultKey && defaultKey}`}>
          <div className='flex justify-between'>
            <Skeleton className='h-4 w-40 mb-3' />
            <Skeleton className='h-4 w-12 mb-3' />
          </div>

          <div>
            <Skeleton className='h-2 w-full mb-1' />
            <Skeleton className='h-2 w-36 mb-1' />
            <Skeleton className='h-2 w-44 mb-1' />
          </div>

          <div>
            <div className='flex items-center gap-2'>
              <Skeleton className='size-12 rounded-full' />
              <div>
                <Skeleton className='h-3 w-44 mb-1' />
                <Skeleton className='h-3 w-14' />
              </div>
            </div>
          </div>

          <div>
            {arr(4).map((_, idx) => (
              <div className="py-1 flex justify-between" key={`task-skeleton-ul-${idx}-${defaultKey && defaultKey}`}>
                <Skeleton className="w-full rounded-lg h-4" />
              </div>
            ))}
          </div>

          <div className='flex gap-1'>
            {arr(4).map((_, idx) => (
              <Skeleton key={`task-skeleton-action-${idx}-${defaultKey && defaultKey}`} className='w-8 h-7' />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}