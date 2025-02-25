<template>
  <div class="payment">
    <div ref="dropin"></div>
    <button ref="submit" :class="btnClass" :disabled="loading">{{ btnText }}</button>
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
    data () {
      return {
        loading: false, // When a payment is processed, prevents double clicks
        disabled: false // When a payment is successfully processed, the entire component is disabled
      }
    },
    mounted () {
      let vm = this
      // Create config
      let config = {
        authorization: this.token,
        container: this.$refs.dropin,
        locale: this.locale
      }
      // If Paypal is available
      if (this.paypal) {
        config.paypal = {
          flow: 'vault'
        }
      }
      // Create dropin
      DropIn.create(config, function (createErr, instance) {
        vm.$emit('loaded')
        vm.$refs.submit.addEventListener('click', function () {
          if (! vm.loading && ! vm.disabled) {
            instance.requestPaymentMethod(function (err, payload) {
              if (err) {
                // No payment method is available.
                // An appropriate error will be shown in the UI.
                console.error(err)
                return
              }
              vm.loading = true
              vm.pay(payload.nonce)
            })
          }
        })
      })
    },
    destroyed() {
      vm.$refs.submit.removeEventListenter('click')
    },
    methods: {
      pay (nonce) {
        this.$axios.post(this.url, {nonce: nonce})
        .then(response => {
          this.$emit('success')
          this.loading = false
          this.disabled = true
        })
        .catch(error => {
          this.$emit('fail', error.response.data.message)
          this.loading = false
        })
      }
    }
  }
</script>
