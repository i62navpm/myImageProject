<template lang="pug">
  v-card
    v-card-title.headline Forgot the password
    v-card-text
      form(v-if="showPasswordForm" @keydown.enter.prevent="sendActivatePassword")
        v-text-field(label="Code", v-model="code", required)
        v-text-field(type="password" label="Password", hint="The length must be more than 8 characters", v-model="password" required)
        v-layout(row justify-space-between)
          small *indicates required field
          v-btn(color="primary" :loading="loading"  @click.prevent="sendActivatePassword" :disabled="loading") Set password
        v-alert(error dismissible transition="scale-transition" v-model="alert") {{error}}
      form(v-else @keydown.enter.prevent="sendForgotPassword")
        v-text-field(type="email" label="Email", v-model="email", required)
        v-layout(row justify-space-between)
          small *indicates required field
          v-btn(color="primary" :loading="loading"  @click.prevent="sendForgotPassword" :disabled="loading") Forgot password
        v-alert(error dismissible transition="scale-transition" v-model="alert") {{error}}
        v-layout(v-bind="binding" justify-space-between)
          v-btn(color="primary" small flat :to="'/'") Have you an account?
</template>

<script>
export default {
  data() {
    return {
      showPasswordForm: false,
      email: '',
      code: '',
      password: '',
      loading: false,
      alert: false,
      error: ''
    }
  },
  methods: {
    async sendForgotPassword() {
      this.loading = true
      try {
        this.showPasswordForm = await this.$store.dispatch('auth/FORGOT_PASSWORD', { email: this.email.trim() })
        this.alert = false
      } catch (error) {
        this.error = error.message
        this.alert = true
      }
      this.loading = false
    },
    async sendActivatePassword() {
      this.loading = true
      try {
        this.showPasswordForm = await this.$store.dispatch(
          'auth/CONFIRM_PASSWORD',
          {
            email: this.email.trim(),
            code: this.code.trim(),
            password: this.password.trim()
          }
        )
        this.$router.push({ name: 'index' })
      } catch (error) {
        this.error = error.message
        this.alert = true
      }
      this.loading = false
    }
  },
  computed: {
    binding () {
      const binding = {}
      if (!this.$vuetify.breakpoint.smAndUp) binding.column = true
      return binding
    }
  }
}
</script>
