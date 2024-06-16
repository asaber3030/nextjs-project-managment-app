import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type Props = {
  title: string,
  label?: string,
  className?: ClassValue
}

export const AccountHeaderMain = ({ className, title, label }: Props) => {

  return ( 
    <div className={cn(className)}>
      <h1 className='text-xl font-medium'>{title}</h1>
      {label && (
        <p className='font-normal text-sm text-gray-500'>{label}</p>
      )}
    </div>
  );
}