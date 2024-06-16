import { cn, formatNumber } from "@/lib/utils"
import { LucideIcon, Star } from "lucide-react"

type Props = {
  title: string
  number: number
  icon: LucideIcon
}

export const OneStat = ({ number, title, icon: Icon }: Props) => {
  return ( 
    <section className="p-4 flex gap-5">
      <div className='bg-white rounded-md shadow-sm w-fit h-fit p-4 justify-center'>
        <Icon className="text-yellow-500 size-6" />
      </div>
      <div>
        <p className='text-2xl font-semibold'>{formatNumber(number)}+</p>
        <h3 className='text-gray-500'>{title}</h3>
      </div>
    </section>
  );
}