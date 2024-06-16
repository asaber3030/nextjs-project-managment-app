import { paymentConfigs } from "@/services/paymob"

const firstStep = async () => {
  const req = await fetch('https://accept.paymob.com/api/auth/tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'api_key': "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RjM01UZ3hMQ0p1WVcxbElqb2lNVGN4TmpZM05EWTVOaTQwTURBd09UY2lmUS5CcVdBcGRUall1SjZ0bm96azkxSzVEYVd0d1Y3Q2twbVlyNTdJU0ptRUV5RUx5X0t5UlZHQ1dCd0VlandVR3B1RV9zSVdvYWlPT1VoaXIyTWxQWGpTdw=="
    })
  })
  const body = await req.json()
  const authToken = body.token

  secondStep(authToken)

}

const secondStep = async (authToken: string) => {
  const req = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "auth_token": authToken,
      "delivery_needed": "false",
      "amount_cents": "100",
      "currency": "EGP",
      "merchant_order_id": 5,
      "items": [
        {
            "name": "ASC1515",
            "amount_cents": "100",
            "description": "Smart Watch",
            "quantity": "1"
        },
      ],
      "shipping_data": {
        "apartment": "803", 
        "email": "claudette09@exa.com", 
        "floor": "42", 
        "first_name": "Clifford", 
        "street": "Ethan Land", 
        "building": "8028", 
        "phone_number": "+86(8)9135210487", 
        "postal_code": "01898", 
        "extra_description": "8 Ram , 128 Giga",
        "city": "Jaskolskiburgh", 
        "country": "CR", 
        "last_name": "Nicolas", 
        "state": "Utah"
      },
      "shipping_details": {
        "notes" : " test",
        "number_of_packages": 1,
        "weight" : 1,
        "weight_unit" : "Kilogram",
        "length" : 1,
        "width" :1,
        "height" :1,
        "contents" : "product of some sorts"
      }
    })
  })

  const body = await req.json()
  const id = body.id

  thirdStep(id, authToken)
}

const thirdStep = async (id: number, authToken: string) => {
  const req = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "auth_token": authToken,
      "order_id": id,
      "amount_cents": "100", 
      "expiration": 3600, 
      "billing_data": {
        "apartment": "803", 
        "email": "claudette09@exa.com", 
        "floor": "42", 
        "first_name": "Clifford", 
        "street": "Ethan Land", 
        "building": "8028", 
        "phone_number": "+86(8)9135210487", 
        "shipping_method": "PKG", 
        "postal_code": "01898", 
        "city": "Jaskolskiburgh", 
        "country": "CR", 
        "last_name": "Nicolas", 
        "state": "Utah"
      }, 
      "currency": "EGP", 
      "integration_id": paymentConfigs.walletIntegrationId
    })
  })
  const body = await req.json()
  const paymentToken = body.token

  cardPayment(paymentToken)
}

const cardPayment = async (paymentToken: string) => {
  const req = await fetch('https://accept.paymob.com/api/acceptance/payments/pay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "source": {
        "identifier": "wallet mobile number", 
        "subtype": "WALLET"
      },
      "payment_token": paymentToken
    })
  })

  const body = await req.json()

  console.log('----------------------------------------------')
  console.log({ lastStep: body })
  console.log('----------------------------------------------')
}

firstStep()