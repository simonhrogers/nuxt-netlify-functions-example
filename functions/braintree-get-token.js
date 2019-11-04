// import gateway from './../lib/gateway.js';

import { connect, Environment } from 'braintree';
require('dotenv').config();


export async function handler(event, context) {

  const {
    BT_ENVIRONMENT,
    BT_MERCHANT_ID,
    BT_PUBLIC_KEY,
    BT_PRIVATE_KEY
  } = process.env;

  const environment =
    BT_ENVIRONMENT.charAt(0).toUpperCase() + BT_ENVIRONMENT.slice(1);

  const gateway = connect({
    environment: Environment[environment],
    merchantId: BT_MERCHANT_ID,
    publicKey: BT_PUBLIC_KEY,
    privateKey: BT_PRIVATE_KEY
  });

  const response = await gateway.clientToken.generate();

  const clientToken = response.clientToken;

  return {
    statusCode: 200,
    body: JSON.stringify({ token: clientToken })
  };
}
