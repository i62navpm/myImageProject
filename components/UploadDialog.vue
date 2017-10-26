<template lang="pug">
v-layout(row justify-center v-if="url" )
  v-dialog(v-model='dialog', persistent max-width='500px')
    v-btn(color='red darken-2', @click.stop="dialog = true" slot="activator", fab dark absolute bottom right)
      v-icon camera
    v-card
      v-card-title
        span.headline Upload a picture
      v-card-text
        v-container(grid-list-md)
          v-layout(wrap)
            v-flex(xs12)
              input(type="file" v-on:change="uploadFile")
      v-card-actions
        v-spacer
        v-btn(color='blue darken-1', flat @click.native='closeDialog()') Close

</template>

<script>
export default {
  data() {
    return {
      url: '',
      token: '',
      dialog: false
    }
  },
  async mounted() {
    const {url, token} = await this.$store.dispatch('images/GET_INSTANCE', {email: this.$store.state.auth.authEmail})
    this.url = url
    this.token = token
  },
  methods: {
    closeDialog() {
      this.dialog = false
    },
    async uploadFile(event) {
      await this.$store.dispatch('images/UPLOAD_IMAGE', {
        email: this.$store.state.auth.authEmail,
        name: event.target.files[0].name,
        file: event.target.files[0]
      })
      await this.$store.dispatch('images/GET_IMAGES', {email: this.$store.state.auth.authEmail})
      this.closeDialog()
      event.target.files = null
    }
  }
}
</script>

<style>
  .dz-preview {
    left: 50%;
    transform: translateX(-50%);
  }
</style>
