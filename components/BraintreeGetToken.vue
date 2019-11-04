<script>
export default {
  name: 'BraintreeGetToken',
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

<template>
  <div>
    <h2>8. Braintree, Get Token</h2>
    <ElButton type="primary" @click="helloWorld()">Get Token</ElButton>
    <p>Response: {{ response }}</p>
    <p v-if="error" style="color:red;">
      <strong>Error {{ error.status }}</strong>
      <br />
      {{ error.data }}
    </p>
    <p>Braintree Form:</p>
    <v-braintree v-if="response" :token="response.token" :paypal="true"></v-braintree>
  </div>
</template>
