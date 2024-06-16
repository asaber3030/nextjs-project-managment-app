export const paymentURLs = {
  firstStep: 'https://accept.paymob.com/api/auth/tokens',
  secondStep: 'https://accept.paymob.com/api/ecommerce/orders',
  thirdStep: 'https://accept.paymob.com/api/acceptance/payment_keys'
}

export const paymentConfigs = {
  cardIntegrationId: 4578431,
  walletIntegrationId: 4583531
}

export const paymentIframes = [847200]

export const getIframe = (paymentToken: string, iframeIdx: number = 0) => {
  return `https://accept.paymob.com/api/acceptance/iframes/${paymentIframes[iframeIdx]}?payment_token=${paymentToken}`
}