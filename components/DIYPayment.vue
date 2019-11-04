<template>
  <div id="dropin-wrapper">
    <div id="checkout-message"></div>
    <div id="dropin-container"></div>
    <button id="submit-button">Submit payment</button>
  </div>
</template>

<script>
  export default {
    props: {
      token: {
        required: true,
        type: String
      },
      locale: {
        type: String,
        default: 'en_US'
      },
      url: {
        type: String,
        default: '/pay'
      },
      btnText: {
        type: String,
        default: 'Pay'
      },
      btnClass: {
        type: String,
        default: 'btn btn-primary'
      },
      paypal: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        button: ''
      }
    },
    methods: {
      createTransaction(payload) {
        console.log(payload);
        axios.post('/.netlify/functions/braintree-create-transaction', {
          'payment_method_nonce': payload.nonce,
          'amount': 10.0
        })
        .then((response) => {
          console.log(response);
          $('#submit-button').remove();
        }, (error) => {
          console.log(error);
        });
      }
    },
    mounted() {
      var button = document.querySelector('#submit-button');
      var vm = this;

       braintree.dropin.create({
         // Insert your tokenization key here
         authorization: this.token,
         container: '#dropin-container'
       }, function (createErr, instance) {
         button.addEventListener('click', function () {
           instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
             // When the user clicks on the 'Submit payment' button this code will send the
             // encrypted payment information in a variable called a payment method nonce

             console.log(payload);
             vm.$axios.$post('/.netlify/functions/braintree-create-transaction', {
               'payment_method_nonce': payload.nonce,
               'amount': 10.0
             })
             .then((response) => {
               console.log(response);
               $('#submit-button').remove();
             }, (error) => {
               console.log(error);
             });

             // $.ajax({
             //   type: 'POST',
             //   url: '/.netlify/functions/braintree-create-transaction',
             //   data: {
             //     'payment_method_nonce': payload.nonce,
             //     'amount': 10.0
             //   }
             // }).done(function(result) {
             //   // Tear down the Drop-in UI
             //   instance.teardown(function (teardownErr) {
             //     if (teardownErr) {
             //       console.error('Could not tear down Drop-in UI!');
             //     } else {
             //       console.info('Drop-in UI has been torn down!');
             //       // Remove the 'Submit payment' button
             //       $('#submit-button').remove();
             //     }
             //   });
             //
             //   if (result.success) {
             //     $('#checkout-message').html('<h1>Success</h1><p>Your Drop-in UI is working! Check your <a href="https://sandbox.braintreegateway.com/login">sandbox Control Panel</a> for your test transactions.</p><p>Refresh to try another transaction.</p>');
             //   } else {
             //     console.log(result);
             //     $('#checkout-message').html('<h1>Error</h1><p>Check your console.</p>');
             //   }
             // });


           });
         });
       });
    }
  }
</script>
