"use client";

import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import { useUser } from "@/hooks";

import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Plan } from "@/types";

import { Button } from "@/components/ui/button";
import { PlansContext } from "@/providers/plans";

export const NewSubscription = () => {

  const user = useUser()
  
  const [choosedPlan, setChoosedPlan] = useState(1)
  const [plan, setPlan] = useState<Plan>()

  const plans = useContext(PlansContext)

  const handleSubscription = () => {
    if (plan) {
      window.open(plan?.paymentLink + `?prefilled_email=${user?.email}`)
      return
    }
    toast.error("Something went wrong while loading plan data.")
  }

  useEffect(() => {
    if (plans && plans.length > 0) {
      setPlan(plans.find(p => p.id === choosedPlan))
    }
  }, [plans, choosedPlan])

  return ( 
    <div className='mt-4'>

      <h2 className='text-xl mb-1 font-medium'>New Subscription</h2>
            
      <div className='grid xl:grid-cols-3 grid-cols-1 gap-2'>
        {plans.map(plan => (
          <div 
            key={`plan-idx-choose-${plan.id}`} 
            className={cn(
              'cursor-pointer hover:border-secondaryMain border rounded-sm p-4 transition-all',
              choosedPlan === plan.id && 'border-secondaryMain'
            )}
            onClick={() => setChoosedPlan(plan.id)}
          >
            <div className="flex items-center justify-between">
              <h3 className='text-lg font-medium'>{plan.name}</h3>
              <p className='text-xl font-bold text-green-700'>${plan.price}.00</p>
            </div>
            <div>
              <Link href='/#plans-section' className='text-xs hover:underline'>View details.</Link>
            </div>
          </div>
        ))}
      </div>

      {plan?.id !== 1 && (
        <Button onClick={handleSubscription} className='mt-3 px-4' size='lg' variant='primary'>Subscribe</Button>
      )}
    </div>
  );
}