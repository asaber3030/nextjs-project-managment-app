import { cn } from "@/lib/utils";

import Image from "next/image";

type Props = {
  className?: string,
  title?: string,
  imageSrc?: string,
  width?: number,
  height?: number
}
export const EmptyState = ({ width = 100, height = 100, imageSrc = '/defaults/empty-search.svg', className, title = 'No Data Found' }: Props) => {
  return ( 
    <section className={cn(className, 'bg-secondary text-center p-4 rounded-md shadow-sm')}>
      <Image src={imageSrc} alt='Empty' width={width} height={height} className='mx-auto' />
      <h2 className='font-medium text-lg mt-4'>{title}</h2>
    </section>
  );
}