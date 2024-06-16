"use client";

import { route } from "@/lib/route";
import { Subscription } from "@/types";
import { BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  subscription: Subscription
}

export const SubscriptionPlanCardSidebar = ({ subscription }: Props) => {

  const { push } = useRouter()

  return ( 
    <div onClick={() => push(route.account('subscriptions'))} className='my-2 mx-2 p-4 cursor-pointer text-gray-300  rounded-md transition-all shadow-sm bg-darkNavbar'>
      <div className="flex gap-2 items-center">
        <BadgeCheck className='size-4 text-secondaryMain' />
        <div className='flex justify-between items-center w-full'>
          <span className='font-semibold text-xs text-secondaryMain'>{subscription?.plan?.name} Plan</span>
          <span className='text-gray-400 text-xs'>Valid through 19 Mar, 2025</span>
        </div>
      </div>
    </div>
  )
}