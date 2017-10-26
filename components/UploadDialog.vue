<template lang="pug">
v-layout(row justify-center)
  v-dialog(v-model='dialog', persistent max-width='500px')
    v-btn(color='red darken-2', @click.stop="dialog = true" slot="activator", fab dark absolute bottom right)
      v-icon camera
    v-card
      v-card-title
        span.headline Upload a picture
      v-card-text
        v-container(grid-list-md)
          v-layout(wrap)
            v-flex(row)
              transition(name="fade" mode="out-in")
                .text-xs-center.upload-image(v-if="!isUploading" key="false")
                  input(type="file" v-on:change="uploadFile" accept="image/*")
                .text-xs-center.upload-image(v-if="isUploading" key='true')
                  v-progress-circular(v-bind:size="100" v-bind:width="15" v-bind:rotate="360" v-bind:value="progress" color="teal")
                    | {{ progress }}


                
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
      dialog: false,
      progress: 0
    }
  },
  methods: {
    closeDialog() {
      this.dialog = false
    },
    async uploadFile(event) {
      this.progress = 1

      let config = {onUploadProgress: (progressEvent) => {
        this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      }}

      await this.$store.dispatch('images/UPLOAD_IMAGE', {
        email: this.$store.state.auth.authEmail,
        name: event.target.files[0].name,
        file: event.target.files[0],
        config
      })
      await this.$store.dispatch('images/GET_IMAGES', {email: this.$store.state.auth.authEmail})
      this.closeDialog()
      event.target.value = null
      this.progress = 0
    }
  },
  computed: {
    isUploading() {
      return !!this.progress
    }
  }
}
</script>

<style scoped>
  .upload-image {
    height: 8rem;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
