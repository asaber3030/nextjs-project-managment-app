"use server"

import { stripe } from "@/services/stripe";

import db from "@/services/prisma";
import moment from "moment";
import { getCurrent } from "./user-data";

export async function getInvoice(invoiceId: string) {
  const invoice = await stripe.invoices.retrieve(invoiceId)
  return invoice
}

export async function getSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  return subscription
}

export async function sendInvoice(invoiceId: string) {

  try {
    await stripe.invoices.update(invoiceId, {
      collection_method: 'send_invoice'
    })
    await stripe.invoices.sendInvoice(invoiceId)
    await stripe.invoices.update(invoiceId, {
      collection_method: 'charge_automatically'
    })
  } catch (error) {
    throw error
  }
  
}

export async function cancelSubscription(stripeSubscriptionId: string, dbSubscriptionId: number) {
  const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId)
  const user = await getCurrent()

  if (!subscription) return { message: 'No subscriptions found.' }

  const subscriptionCreated = subscription ? subscription.created : 0
  const afterAdding = moment(subscriptionCreated * 1000).add(15, 'days')
  const isAfter = moment(moment.now()).isAfter(afterAdding)

  if (!isAfter) {
    await stripe.subscriptions.cancel(stripeSubscriptionId)
    await db.subscription.update({
      where: { id: dbSubscriptionId },
      data: { status: 'canceled' }
    })
    await db.user.update({
      where: { id: user?.id },
      data: { planId: 1 }
    })
    await db.subscription.create({
      data: {
        userId: user?.id as number,
        planId: 1,
        subTotal: 0,
        total: 0,
        subscriptionId: '',
        invoiceId: '',
        status: 'complete',
        currency: 'usd',
        email: user?.email!,
        customerId: '',
        expiresAt: 0
      }
    })
    return {
      message: 'Subscription has been cancelled succsessfully.'
    }
  }
  return {
    message: 'Cannot cancel subscription due to date. You have passed 15 days of subscription date.'
  }
}