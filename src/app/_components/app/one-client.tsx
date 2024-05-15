import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import Image from "next/image"

type Props = {
  image: string
  name: string
  jobTitle: string
  description: string
  stars: number
  idx: number
}

export const OneClient = ({ stars, idx, image, name, jobTitle, description }: Props) => {
  return ( 
    <section className={cn("p-4 rounded-md shadow-sm bg-white h-fit", idx === 1 && "xl:scale-110 border bg-main text-gray-200 shadow-lg")}>
      <div className="max-h-[100px] h-[100px] flex justify-start items-center">
        <Image alt="Landing page" src={image} width={1000} height={1000} className='rounded-full object-contain w-[100px] h-[100px] mx-auto ring-2 ring-blue-500' />
      </div>
      <h2 className="text-xl font-semibold mt-3 text-center">{name}</h2>
      <h2 className="text-sm font-medium text-gray-500 text-center">{jobTitle}</h2>
      <div className='flex gap-2 justify-center my-2'>
        {Array.from({ length: stars }).map((star) => (
          <Star fill="#E65100" className=' size-4 text-[#E65100]' key={`star-filled-${star}`} />
        ))}
        {Array.from({ length: 5 - stars }).map((star) => (
          <Star className='text-orange-600 size-4 ' key={`star-filled-${star}`} />
        ))}
      </div>
      <p className="text-gray-500 text-xs text-center mt-3">{description}</p>
    </section>
  );
}