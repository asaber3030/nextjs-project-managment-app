import { notify } from '@/actions/user-data'
import { route } from '@/lib/route'

import { NextRequest, NextResponse } from 'next/server'

import db from '@/services/prisma'
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET!)
const endpointSecret = process.env.STRIPE_WEBHOOK!

async function fulfillOrder(data: Stripe.LineItem[], eventObj: Stripe.Checkout.Session) {

  const customerEmail = eventObj.customer_details?.email
  const findUser = await db.user.findUnique({ where: { email: customerEmail! } })

  const priceObject: Stripe.Price | null = data[0].price
  const boughtProduct = await stripe.products.retrieve(priceObject?.product as string)
  const plan = await db.plan.findUnique({
    where: {
      id: boughtProduct.name === 'Free' ? 1 : boughtProduct.name === 'Basic' ? 2 : boughtProduct.name === 'Professional' ? 3 : 1
    }
  })

  if (!findUser) { return false }

  if (eventObj.payment_status === 'paid') {
    await db.user.update({
      where: { id: findUser.id },
      data: { planId: plan?.id as number }
    })
    await notify(
      `Your subscription to plan <b>${plan?.name}</b> has been paid and your are successfully subscribed.`,
      route.account('subscriptions'),
      findUser.id
    )
  }

  try {
    await db.subscription.create({
      data: {
        userId: findUser.id,
        planId: plan?.id as number || 1,
        subTotal: eventObj.amount_subtotal as number,
        total: eventObj.amount_total as number,
        currency: eventObj.currency!,
        email: findUser.email,
        status: eventObj.status!,
        customerId: eventObj.customer as string,
        expiresAt: eventObj.expires_at,
        invoiceId: eventObj.invoice as string,
        subscriptionId: eventObj.subscription as string,
      }
    })
    return true
  } catch (err) {
    return false
  }
}


const handleCompletedCheckoutSession = async (event: Stripe.CheckoutSessionCompletedEvent) => {

  try {
    const sessionWithItems = await stripe.checkout.sessions.retrieve((event.data.object as any).id, { expand: ['line_items'] })
    const lineItems = sessionWithItems.line_items

    if (!lineItems) return false

    const orderFulfilled = await fulfillOrder(lineItems.data, event.data.object)

    if (orderFulfilled) return true
    
    return false

  } catch (error) {
    return false
  }
}

export async function POST(req: NextRequest) {
  
  const rawBody = await req.text()
  const signature = req.headers.get('stripe-signature')

  let event

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature!, endpointSecret!)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 404 })
  }

  switch(event.type) {

    case 'checkout.session.completed':
      const savedSession = await handleCompletedCheckoutSession(event)
      if (!savedSession) {
        return NextResponse.json({ error: 'Unable to save checkout session' }, { status: 500 })
      }
    
    case 'customer.subscription.updated': 
      return NextResponse.json({ message: 'Nice update' }, { status: 200 })

    default:
      return NextResponse.json({ error: 'Unhandled event type ' + event.type }, { status: 500 })
    }
}

