<script>
import Example1 from '@/components/Example1'
import Example2 from '@/components/Example2'
import Example3 from '@/components/Example3'
import Example4 from '@/components/Example4'
import Example5 from '@/components/Example5'
import Example6 from '@/components/Example6'
import Example7 from '@/components/Example7'
import BraintreeGetToken from '@/components/BraintreeGetToken'

export default {
  components: {
    Example1,
    Example2,
    Example3,
    Example4,
    Example5,
    Example6,
    Example7,
    BraintreeGetToken
  }
}
</script>

<template>
  <div>
    <BraintreeGetToken />
  </div>
</template>

<style lang="scss">
.separator {
  margin: 3em 0;
  border-color: lightgray;
  border-width: 0.5px;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
