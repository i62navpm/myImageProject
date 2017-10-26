<template lang="pug">
  v-card
    v-card-title.headline Register
    v-card-text
      form(@keyup.enter="sendRegister")
        v-text-field(type="email" label="Email", v-model="email", required)
        v-text-field(type="password" label="Password", hint="The length must be more than 8 characters", v-model="password" required)
        v-layout(row justify-space-between)
          small *indicates required field
          v-btn(color="primary" :loading="loading"  @click.prevent="sendRegister" :disabled="loading") Sign up
        v-alert(error dismissible transition="scale-transition" v-model="alert") {{error}}
        v-layout(v-bind="binding" justify-space-between)
          v-btn(color="primary" small flat :to="'/'") Have you an account?
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
    async sendRegister() {
      this.loading = true

      try {
        let userConfirmed = await this.$store.dispatch('auth/REGISTER', ({ username: this.email.trim(), password: this.password.trim() }))
        !userConfirmed && this.$router.push({ name: 'verification' })
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
