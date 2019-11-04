<template>
  <div>
    <ElButton type="primary" @click="helloWorld()">BUY NOW!</ElButton>
    <p>Response: {{ response }}</p>
    <p>Vue Braintree:</p>
    <v-braintree v-if="response !== '—'" :token="response.token" :paypal="true" :url="'/.netlify/functions/braintree-create-transaction'"></v-braintree>

    <p>Locally:</p>
    <Payment />
  </div>
</template>

<script>
import Payment from '@/components/Payment'
export default {
  name: 'BraintreeGetToken',
  components: { Payment },
  data() {
    return {
      response: '—',
      error: null
    }
  },
  methods: {
    async helloWorld() {
      try {
        const res = await this.$axios.$get('/.netlify/functions/braintree-get-token')
        this.response = res
        console.log('Token:');
        console.log(this.response);
        this.error = null
      } catch (e) {
        this.error = e.response
        this.response = '—'
      }
    },
    async createTransaction() {
      try {
        const res = await this.$axios.$post('/.netlify/functions/braintree-create-transaction', { "payment_method_nonce": "fake-valid-nonce", "amount": 10.0 }, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          }
        })
        this.response = res
        console.log('Token:');
        console.log(this.response);
        this.error = null
      } catch (e) {
        this.error = e.response
        this.response = '—'
      }
    }
  }
}
</script>
