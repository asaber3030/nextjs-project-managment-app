import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const ButtonSkeleton = ({ className }: { className?: string }) => {
  return ( 
    <Skeleton className={cn('h-8 w-[100px]', className)} />
  );
}