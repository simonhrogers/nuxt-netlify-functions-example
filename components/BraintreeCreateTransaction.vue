<script>
export default {
  name: 'BraintreeCreateTransaction',
  data() {
    return {
      response: '—',
      error: null
    }
  },
  methods: {

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
  </div>
</template>
