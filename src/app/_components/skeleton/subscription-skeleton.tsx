import { Skeleton } from "@/components/ui/skeleton";

type Props = { repeat?: number }

export const SubscriptionSkeleton = ({ repeat = 1 }: Props) => {
  return ( 
    <div className='space-y-4'>
      {Array.from({ length: repeat }).map((_, idx) => (
        <div key={`skeleton-subscription-${idx}`} className='p-4 border rounded-md'>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-4 w-32 rounded-sm' />
            <Skeleton className='h-4 w-20 rounded-sm' />
          </div>
          <ul className='mt-4 divide-y'>
            <li className='flex gap-10 py-2'>
              <Skeleton className='h-3 w-36' />
              <Skeleton className='h-3 w-20' />
            </li>
            <li className='flex gap-10 py-2'>
              <Skeleton className='h-3 w-36' />
              <Skeleton className='h-3 w-20' />
            </li>
            <li className='flex gap-10 py-2'>
              <Skeleton className='h-3 w-36' />
              <Skeleton className='h-3 w-20' />
            </li>
            <li className='flex gap-10 py-2'>
              <Skeleton className='h-3 w-36' />
              <Skeleton className='h-3 w-20' />
            </li>
            <li className='flex gap-10 py-2'>
              <Skeleton className='h-3 w-36' />
              <Skeleton className='h-3 w-20' />
            </li>
            <li className='flex gap-10 py-2'>
              <Skeleton className='h-3 w-36' />
              <Skeleton className='h-3 w-20' />
            </li>
          </ul>

          <div className='flex mt-4 gap-3'>
            <Skeleton className="h-2 w-20" />
            <Skeleton className="h-2 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}