<template lang="pug">
  v-layout(row justify-center align-center)
    v-flex(xs12 sm8 md6)
      register
</template>

<script>
import Register from '~/components/Register.vue'

export default {
  components: {
    Register
  }
}
</script>