<template lang="pug">
  v-card
    v-card-title.headline Verificate email
    v-card-text
      form(@keyup.enter="sendCode")
        v-text-field(label="Enter the verification code", v-model="code", required)
        v-layout(row justify-space-between)
          small *indicates required field
          v-btn(color="primary" :loading="loading"  @click.prevent="sendCode" :disabled="loading") Verificate code
        v-alert(error dismissible transition="scale-transition" v-model="alert") {{error}}
</template>

<script>
export default {
  data () {
    return {
      code: '',
      loading: false,
      alert: false,
      error: ''
    }
  },
  methods: {
    async sendCode() {
      this.loading = true

      try {
        let userVerificated = await this.$store.dispatch('auth/VERIFICATE_CODE', {code: this.code.trim()})
        userVerificated && this.$router.push({ name: 'index' })
      } catch (error) {
        this.error = error.message
        this.alert = true
      }
      this.loading = false
    }
  }
}
</script>
