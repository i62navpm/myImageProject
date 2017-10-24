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
            v-flex(xs12 sm6 md4)
              p webcam
      v-card-actions
        v-spacer
        v-btn(color='blue darken-1', flat @click.native='dialog = false') Close
        v-btn(color='blue darken-1', flat @click.native='dialog = false') Save

</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      photo: null
    }
  },
  methods: {
    takePhoto () {
    }
  }
}
</script>
