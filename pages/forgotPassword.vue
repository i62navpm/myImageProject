<template lang="pug">
  v-layout(row justify-center align-center)
    v-flex(xs12 sm8 md6)
      forgot-password
</template>

<script>
import ForgotPassword from '~/components/ForgotPassword.vue'

export default {
  components: {
    ForgotPassword
  }
}
</script>