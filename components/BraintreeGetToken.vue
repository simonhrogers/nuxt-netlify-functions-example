<template>
  <div>
    <ElButton type="primary" @click="helloWorld()">BUY NOW!</ElButton>
    <p>Response: {{ response }}</p>

    <hr class="separator" />
    <p>Vue Braintree:</p>
    <v-braintree v-if="response !== '—'" :token="response.token" :paypal="true" :url="'/.netlify/functions/braintree-create-transaction'"></v-braintree>

    <!-- <hr class="separator" />
    <p>Payment:</p>
    <Payment v-if="response !== '—'" :token="response.token" :paypal="true" :url="'/.netlify/functions/braintree-create-transaction'" /> -->

    <hr class="separator" />
    <p>DIY Payment:</p>
    <DIYPayment v-if="response !== '—'" :token="response.token" :paypal="true" :url="'/.netlify/functions/braintree-create-transaction'" />
  </div>
</template>

<script>
import Payment from '@/components/Payment'
import DIYPayment from '@/components/DIYPayment'
export default {
  name: 'BraintreeGetToken',
  components: { Payment, DIYPayment },
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
    }
  }
}
</script>
