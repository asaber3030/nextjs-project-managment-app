import Stripe from 'stripe'

export const stripePaymentLinks = {
  basic: 'https://buy.stripe.com/test_fZeg2OazXdHp6ycdQQ'
}

export const stripe = new Stripe(process.env.STRIPE_SECRET!)