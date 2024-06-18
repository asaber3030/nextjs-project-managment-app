import { useMutation } from "@tanstack/react-query";

import { cancelSubscription } from "@/actions/stripe";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Stripe from "stripe";

type Props = {
  subscriptionStatus: Stripe.Subscription.Status,
  dbStatus: string,
  canCancelDueToDate: boolean,
  stripeSubscriptionId: string,
  dbSubscriptionId: number,
  planId: number,
  open: boolean, 
  setOpen: (value: boolean) => void
}

export const CancelSubscriptionModal = ({ dbStatus, subscriptionStatus, setOpen, open, planId, canCancelDueToDate, dbSubscriptionId, stripeSubscriptionId }: Props) => {

  const mutateCancel = useMutation({
    mutationFn: () => cancelSubscription(stripeSubscriptionId, dbSubscriptionId),
    onSuccess: (data) => {
      toast.message(data?.message)
    }
  })

  const handleCancel = () => {
    mutateCancel.mutate()
  }

  if (!canCancelDueToDate || (dbStatus === 'canceled') || planId === 1) {
    return (
      <p className='text-xs text-gray-500'>Cancelling isn&apos;t available due to date.</p>
    )
  }

  return ( 
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='p-2 px-3 rounded-sm bg-red-500 hover:bg-red-600 transition-all text-sm text-white'>Cancel Subscription</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleCancel} variant='destructive'>Confirm</Button>
          <Button variant='outline' onClick={() => setOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}