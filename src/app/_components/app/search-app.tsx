import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

type Props = {
  className?: string
}
export const SearchApp = ({ className }: Props) => {
  return ( 
    <div className='relative'>
      <Search className='text-gray-500 absolute -translate-y-1/2 top-1/2 left-3 size-5' />
      <Input placeholder="Search for something" className={cn('pl-10', className && className)} />
    </div>
  );
}