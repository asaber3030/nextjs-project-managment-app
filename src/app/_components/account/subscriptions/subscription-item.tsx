"use client";

import React from "react";
import moment from "moment";

import { useState } from "react";
import { useInvoice, useSubscription } from "@/hooks/useSubscription";

import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";

import { Subscription } from "@/types";

import { ArrowRight, Check, X } from "lucide-react";
import { CancelSubscriptionModal } from "./cancel-modal";
import { SubscriptionMoneyLi } from "./money-details";
import { SubscriptionInvoiceButtons } from "./invoice-buttons";
import { OnlySpinner } from "@/components/loading-spinner";

type Props = { subscription: Subscription }

export const SubscriptionItem = ({ subscription }: Props) => {

  const [modalStatus, setModalStatus] = useState(false)

  const { invoice, invoiceLoading } = useInvoice(subscription.invoiceId)
  const { sub, subLoading } = useSubscription(subscription.subscriptionId)

  const now = moment()
  const subDate = moment(Number(sub?.current_period_end) * 1000)
  const diff = moment.duration(subDate.diff(now))

  const subscriptionCreated = sub ? sub.created : 0
  const afterAdding = moment(subscriptionCreated * 1000).add(15, 'days')
  const isAfter = moment(moment.now()).isAfter(afterAdding)

  return ( 
    <div className='py-2 px-4 rounded-md border'>
      
      <div className='flex justify-between items-center'>
        <h2 className='text-lg font-medium flex items-center gap-2'>Plan <ArrowRight className='size-4' /> <span className='font-semibold'>{subscription.plan.name}</span></h2>
        <p className='text-sm text-gray-500'>Subscribed in <span className='text-green-600'>{formatDate(subscription.createdAt, 'll')}</span></p>
      </div>

      <div className='mt-1'>

        <ul>
          
          <li className='flex items-center gap-10 py-1'>
            <span className='min-w-36'>Invoice Number</span>
            {subscription.planId != 1 ? (
              <React.Fragment>
                {invoiceLoading ? (<OnlySpinner />) : (
                  <span className="text-blue-500 min-w-36 hover:underline hover:text-blue-800 cursor-pointer select-none flex items-center gap-2">#{invoice?.number ?? <OnlySpinner />}</span>
                )}
              </React.Fragment>
            ): <span>Not available for free plan.</span>}
          </li>

          <li className='flex items-center gap-10 py-1'>
            <span className='min-w-36'>Expires In</span>

            {subscription.planId !== 1 ? (
              <span className='min-w-36 flex items-center gap-2'>
                {formatDate(subscription.createdAt, 'll')}
                <span>-</span>
                {subLoading ? <OnlySpinner /> : moment(Number(sub?.current_period_end) * 1000).format('ll')}
              </span>
            ): <span>Not available for free plan.</span>}
          </li>

          <li className='flex items-center gap-10 py-1'>
            <span className='min-w-36'>Remaining Months</span> 
            {subscription.planId !== 1 ? (
              <span className='min-w-36'>{subLoading ? <OnlySpinner /> : diff.months()} months</span>
            ): <span>Not available for free plan.</span>}
          </li>

          <li className='flex items-center gap-10 py-1'>
            <span className='min-w-36'>Valid</span> 
            <span className={cn('min-w-36 flex gap-1 items-center', subscription.status === 'complete' ? 'text-green-600' : 'text-red-600')}>
              {subscription.status === 'complete' ? <Check className='size-4 text-green-600' /> : <X className='size-4 text-red-600' />}
              {subscription.status.toUpperCase()}
            </span>
          </li>

          <SubscriptionMoneyLi subTotal={subscription.subTotal} total={subscription.total} />

          <div className='flex xl:flex-row mt-4 flex-col flex-wrap gap-2 justify-between xl:items-center border-t-0 border-none pb-0'>
            
            {subscription.planId != 1 && (
              <SubscriptionInvoiceButtons url={invoice?.invoice_pdf!} />
            )}

            <CancelSubscriptionModal
              planId={subscription.planId}
              subscriptionStatus={sub?.status!}
              open={modalStatus}
              setOpen={setModalStatus}
              stripeSubscriptionId={subscription.subscriptionId}
              dbSubscriptionId={subscription.id}
              dbStatus={subscription.status}
              canCancelDueToDate={!isAfter}
            />
            
          </div>

        </ul>

      </div>
      
    </div>
  );
}