// import gateway from '/gateway.js';

const braintree = require('braintree');
require('dotenv').config();

// const {
//   BT_ENVIRONMENT,
//   BT_MERCHANT_ID,
//   BT_PUBLIC_KEY,
//   BT_PRIVATE_KEY
// } = process.env;

const environment = process.env.BT_ENVIRONMENT.charAt(0).toUpperCase() + BT_ENVIRONMENT.slice(1);

const gateway = braintree.connect({
  environment: braintree.Environment[environment],
  merchantId: process.env.BT_MERCHANT_ID,
  publicKey: process.env.BT_PUBLIC_KEY,
  privateKey: process.env.BT_PRIVATE_KEY
});

exports.handler = async (event, context) => {
  const response = await gateway.clientToken.generate();

  const clientToken = response.clientToken;

  return {
    statusCode: 200,
    body: JSON.stringify({ token: clientToken })
  }
}
