"use client";

import moment from "moment";

import { useMutation, useQuery } from "@tanstack/react-query";

import { getInvoice, getSubscription, sendInvoice } from "@/actions/stripe";
import { formatDate } from "@/lib/date";
import { formatNumber } from "@/lib/utils";
import { toast } from "sonner";

import { QueryKeys } from "@/lib/query-keys";
import { Subscription } from "@/types";

import { ArrowRight, Check, Download, Mail, X } from "lucide-react";
import { OnlySpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";

type Props = { subscription: Subscription }

export const SubscriptionItem = ({ subscription }: Props) => {

  const queryInvoice = useQuery({
    queryKey: QueryKeys.accountInvoices(subscription.invoiceId),
    queryFn: () => getInvoice(subscription.invoiceId)
  })

  const querySubscription = useQuery({
    queryKey: QueryKeys.accountSubscriptions(subscription.subscriptionId),
    queryFn: () => getSubscription(subscription.subscriptionId)
  })

  const mutateSendInvoice = useMutation({
    mutationFn: ({ id }: { id: string }) => sendInvoice(id),
    onSuccess: () => {
      toast.message("Success")
    },
    onError: () => {
      toast.message("Error!")
    }
  })

  const { data: invoice, isLoading: invoiceLoading } = queryInvoice
  const { data: sub, isLoading: subLoading } = querySubscription

  const now = moment()
  const subDate = moment(Number(sub?.current_period_end) * 1000)

  const diff = moment.duration(subDate.diff(now))

  const canCancel = true

  const handleSendingInvoice = () => {
    if (invoice) {
      mutateSendInvoice.mutate({ id: invoice.id })
      return;
    }
  }

  return ( 
    <div className='py-2 px-4 rounded-md border'>
      
      <div className='flex justify-between items-center'>
        <h2 className='text-lg font-medium flex items-center gap-2'>Plan <ArrowRight className='size-4' /> <span className='font-semibold'>{subscription.plan.name}</span></h2>
        <p className='text-sm text-gray-500'>Subscribed in <span className='text-green-600'>{formatDate(subscription.createdAt, 'll')}</span></p>
      </div>

      <div className='mt-1'>
        <ul className='divide-y'>
          <li className='flex items-center gap-10 py-0.5'>
            <span className='min-w-36'>Invoice Number</span> 
            <span className="text-blue-500 min-w-36 hover:underline hover:text-blue-800 cursor-pointer select-none flex items-center gap-2">#{invoice?.number ?? <OnlySpinner />}</span>
          </li>

          <li className='flex items-center gap-10 py-0.5'>
            <span className='min-w-36'>Expires In</span> 
            <span className='min-w-36 flex items-center gap-2'>{formatDate(subscription.createdAt, 'll')} - {subLoading ? <OnlySpinner /> : moment(Number(sub?.current_period_end) * 1000).format('ll')}</span>
          </li>

          <li className='flex items-center gap-10 py-0.5'>
            <span className='min-w-36'>Remaining Months</span> 
            <span className='min-w-36'>{subLoading ? <OnlySpinner /> : diff.months()} months</span>
          </li>

          <li className='flex items-center gap-10 py-0.5'>
            <span className='min-w-36'>Valid</span> 
            <span className='min-w-36'>{subscription.status === 'complete' ? <Check className='size-4 text-green-600' /> : <X className='size-4 text-red-600' />}</span>
          </li>

          <li className='flex items-center gap-10 py-0.5'>
            <span className='min-w-36'>Sub Total</span> 
            <span className='text-green-600 min-w-36'>{formatNumber(subscription.subTotal / 100)} {subscription.currency.toUpperCase()}</span>
          </li>

          <li className='flex items-center gap-10 py-0.5'>
            <span className='min-w-36'>Total</span> 
            <span className='text-green-600 min-w-36'>{formatNumber(subscription.total / 100)} {subscription.currency.toUpperCase()}</span>
          </li>

          <div className='flex gap-4 mt-1 border-t-0 pt-1 items-center'>
            <Button onClick={handleSendingInvoice} variant='ghost' className='px-0 py-0 hover:underline'><Mail className='size-4' /> Email with this Invoice</Button>
            {invoiceLoading ? 
              <OnlySpinner />
            :(
              <Button variant='ghost' className='px-0 py-0 hover:underline'><a href={invoice?.invoice_pdf!} target='_blank' className='flex gap-2'><Download className='size-4' /> Download Invoice</a></Button>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}