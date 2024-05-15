import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  className?: string
}
export const AppTitle = ({ className }: Props) => {
  return ( 
    <Link href='/' className={cn('text-lg text-white font-semibold first-letter:text-secondaryMain', className)}><span className='text-secondaryMain font-medium'>P</span>latform</Link>
  );
}