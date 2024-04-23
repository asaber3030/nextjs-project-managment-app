import { Skeleton } from "@/components/ui/skeleton";
import { arr } from "@/lib/utils";

type Props = {
  repeat?: number,
  defaultKey?: string
}

export const ProjectSkeleton = ({ repeat = 4, defaultKey }: Props) => {
  return ( 
    <div className='grid grid-cols-1 xl:grid-cols-3 gap-2'>
      {arr(repeat).map((_, idx) => (
        <div className='rounded-md border p-4 shadow-sm' key={`project-skeleton-${idx}-${defaultKey && defaultKey}`}>
          <Skeleton className='h-4 w-40 mb-3' />
          <Skeleton className='h-2 w-18 mb-1' />
          <Skeleton className='h-2 w-20 mb-1' />
          <Skeleton className='h-2 w-36 mb-1' />

          <div className='mt-4'>
            {arr(4).map((_, idx) => (
              <div className="py-1 flex justify-between" key={`project-skeleton-ul-${idx}-${defaultKey && defaultKey}`}>
                <Skeleton className="w-24 h-2" />
                <Skeleton className="w-16 h-2" />
              </div>
            ))}
          </div>

          <div className='grid xl:grid-cols-4 grid-cols-1 gap-1 mt-4'>
            {arr(4).map((_, idx) => (
              <Skeleton key={`project-skeleton-action-${idx}-${defaultKey && defaultKey}`} className='w-full h-8' />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}