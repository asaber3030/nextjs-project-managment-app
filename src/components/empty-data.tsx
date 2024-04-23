import { cn } from "@/lib/utils";

type Props = {
  label?: string,
  className?: string
}
export const EmptyData = ({ className, label = 'No Data Found' }: Props) => {
  return ( 
    <div className={cn('rounded-md bg-border shadow-sm p-2 px-4 text-gray-700 text-sm', className)}>
      {label}
    </div>
  );
}