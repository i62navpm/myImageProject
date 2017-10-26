<template lang="pug">
  v-layout(row justify-center align-center)
    v-flex(xs12 sm10 md6)
      login
</template>

<script>
import Login from '~/components/Login.vue'

export default {
  components: {
    Login
  }
}
</script>