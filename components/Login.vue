<template lang="pug">
  v-card
    v-card-title.headline Login
    v-card-text
      form(@keyup.enter="sendLogin")
        v-text-field(type="email" label="Email", v-model="email", required)
        v-text-field(type="password" label="Password", hint="The length must be more than 8 characters", v-model="password" required)
        v-layout(row justify-space-between)
          small *indicates required field
          v-btn(color="primary" name="submit-button" :loading="loading" @click.prevent="sendLogin" :disabled="loading") Sign in
        v-alert(error dismissible transition="scale-transition" v-model="alert") {{error}}
      v-layout(row justify-space-between)
        v-btn(color="primary" small flat :to="'forgotPassword'") Forgot the password?
        v-btn(color="primary" small flat :to="'register'") You don't have an account yet?
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      loading: false,
      alert: false,
      error: ''
    }
  },
  methods: {
    async sendLogin () {
      this.loading = true

      try {
        await this.$store.dispatch('auth/LOGIN', ({ username: this.email.trim(), password: this.password.trim() }))
        this.$router.push({ name: 'inspire' })
      } catch (error) {
        this.error = error.message
        this.alert = true
      }
      this.loading = false
    }
  }
}
</script>
