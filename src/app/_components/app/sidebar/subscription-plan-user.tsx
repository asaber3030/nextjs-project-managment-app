import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";

type Props = {
  name: string,
}
export const SubscriptionPlanCardSidebar = ({ name }: Props) => {
  return ( 
    <div className='my-2 mx-2 p-4 cursor-pointer text-gray-300  rounded-md transition-all shadow-sm bg-darkNavbar'>
      <h3 className='text-center'>Subscribed to</h3>
      <div className="flex gap-2 items-center mt-4">
        <BadgeCheck className='size-4 text-secondaryMain' />
        <div className='flex justify-between items-center w-full'>
          <span className='font-bold text-xs text-secondaryMain'>{name} Plan</span>
          <span className='text-gray-400 text-xs'>Valid through 19 Mar, 2025</span>
        </div>
      </div>
      <div className='mt-4 grid grid-cols-2 gap-2'>
        <Button variant='main' className="hover:text-white w-full">Upgrade</Button>
        <Button variant='main' className="hover:text-white w-full">Re new</Button>
      </div>
    </div>
  );
}