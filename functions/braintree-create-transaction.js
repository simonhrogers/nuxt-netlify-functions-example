const braintree = require('braintree');
require('dotenv').config();

const {
  BT_ENVIRONMENT,
  BT_MERCHANT_ID,
  BT_PUBLIC_KEY,
  BT_PRIVATE_KEY
} = process.env;

const environment = BT_ENVIRONMENT.charAt(0).toUpperCase() + BT_ENVIRONMENT.slice(1);

const gateway = braintree.connect({
  environment: braintree.Environment[environment],
  merchantId: BT_MERCHANT_ID,
  publicKey: BT_PUBLIC_KEY,
  privateKey: BT_PRIVATE_KEY
});

const statusCodeOk = 200;
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type'
};

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: headers, body: 'Method Not Allowed' };
  }

  // Parse the body contents into an object.
  const data = JSON.parse(event.body);

  // Make sure we have all required data. Otherwise, return error.
  if (!data.payment_method_nonce || !data.amount) {
    console.error('Required information is missing.');

    return {
      statusCode: 400,
      headers: headers,
      body: JSON.stringify({ status: 'missing-information' })
    };
  }

  // Create a transaction
  const result = await gateway.transaction.sale({
    amount: data.amount,
    paymentMethodNonce: data.payment_method_nonce,
    options: {
      submitForSettlement: true
    }
  });

  if (result.success) {
    // Successful transaction result
    return {
      statusCode: statusCodeOk,
      headers: headers,
      body: JSON.stringify({ transaction: result.transaction.id })
    };
  } else {
    // Unsuccessful result, handle different errors
    const errors = result.errors.deepErrors();

    // Validation errors
    if (errors > 0) {
      return {
        statusCode: statusCodeOk,
        headers: headers,
        body: JSON.stringify({ errors: errors })
      };
    } else {
      return {
        statusCode: statusCodeOk,
        headers: headers,
        body: JSON.stringify({
          errors: getTransactionError(result.transaction)
        })
      };
    }
  }
};

// Check for different rejects like processor declined, settlement or gateway rejection
const getTransactionError = transaction => {
  let customMessage = '';
  if (transaction.status === 'processor_declined') {
    customMessage = `${transaction.processorResponseType}, ${
      transaction.processorResponseCode
    }, ${transaction.processorResponseText}`;
  } else if (transaction.status === 'settlement_declined') {
    customMessage = `${transaction.processorSettlementResponseCode}, ${
      transaction.processorSettlementResponseText
    }`;
  } else if (transaction.status === 'gateway_rejected') {
    customMessage = `${transaction.gatewayRejectionReason}`;
  }

  return {
    error: transaction.status,
    message: customMessage
  };
};
