"use server"

import { stripe } from "@/services/stripe";

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