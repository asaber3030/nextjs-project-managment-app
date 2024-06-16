const eventObj = {
  eventObj: {
    id: 'cs_test_a1wKTo2HgPB1nCkFW4p49gYv5IklBq46T8llZMoBSMlDn18yPEOol7qFEx',
    object: 'checkout.session',
    after_expiration: null,
    allow_promotion_codes: false,
    amount_subtotal: 1000,
    amount_total: 1000,
    automatic_tax: { enabled: false, liability: null, status: null },
    billing_address_collection: 'auto',
    cancel_url: 'https://stripe.com',
    client_reference_id: null,
    client_secret: null,
    consent: null,
    consent_collection: {
      payment_method_reuse_agreement: null,
      promotions: 'none',
      terms_of_service: 'none'
    },
    created: 1717267095,
    currency: 'usd',
    currency_conversion: null,
    custom_fields: [],
    custom_text: {
      after_submit: null,
      shipping_address: null,
      submit: null,
      terms_of_service_acceptance: null
    },
    customer: 'cus_QDNbiE4au7Nd4v',
    customer_creation: 'if_required',
    customer_details: {
      address: [Object],
      email: 'galambo999@a.com',
      name: 'Abdullah Saber',
      phone: null,
      tax_exempt: 'none',
      tax_ids: []
    },
    customer_email: null,
    expires_at: 1717353495,
    invoice: 'in_1PMwqL2NdJf3JTfnPOd4BrOg',
    invoice_creation: null,
    livemode: false,
    locale: 'auto',
    metadata: {},
    mode: 'subscription',
    payment_intent: null,
    payment_link: 'plink_1PKt7D2NdJf3JTfn5BQh34bd',
    payment_method_collection: 'always',
    payment_method_configuration_details: { id: 'pmc_1PL2Wf2NdJf3JTfnez9tzVs9', parent: null },
    payment_method_options: { card: [Object] },
    payment_method_types: [ 'card', 'cashapp' ],
    payment_status: 'paid',
    phone_number_collection: { enabled: false },
    recovered_from: null,
    saved_payment_method_options: {
      allow_redisplay_filters: [Array],
      payment_method_remove: null,
      payment_method_save: null
    },
    setup_intent: null,
    shipping_address_collection: null,
    shipping_cost: null,
    shipping_details: null,
    shipping_options: [],
    status: 'complete',
    submit_type: 'auto',
    subscription: 'sub_1PMwqL2NdJf3JTfndSbeuKEl',
    success_url: 'https://stripe.com',
    total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
    ui_mode: 'hosted',
    url: null
  }
}

const ListItems = [
  {
    id: 'li_1PMw0S2NdJf3JTfnxAyHC44g',
    object: 'item',
    amount_discount: 0,
    amount_subtotal: 1000,
    amount_tax: 0,
    amount_total: 1000,
    currency: 'usd',
    description: 'Basic',
    price: [Object],
    quantity: 1
  }
]

const priceObject = {
  id: 'price_1PKt6R2NdJf3JTfnQA31SBSe',
  object: 'price',
  active: true,
  billing_scheme: 'per_unit',
  created: 1716776159,
  currency: 'usd',
  custom_unit_amount: null,
  livemode: false,
  lookup_key: null,
  metadata: {},
  nickname: null,
  product: 'prod_QBFbMOxoHKdVIU',
  recurring: {
    aggregate_usage: null,
    interval: 'year',
    interval_count: 1,
    meter: null,
    trial_period_days: null,
    usage_type: 'licensed'
  },
  tax_behavior: 'unspecified',
  tiers_mode: null,
  transform_quantity: null,
  type: 'recurring',
  unit_amount: 1000,
  unit_amount_decimal: '1000'
}

const product = {}