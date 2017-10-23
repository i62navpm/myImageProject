<template lang="pug">
  v-layout(row justify-center align-center)
    v-flex(xs12 sm8 md6)
      verification
</template>

<script>
import Verification from '~/components/Verification.vue'

export default {
  components: {
    Verification
  }
}
</script>