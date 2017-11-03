<template lang="pug">
  v-card
    v-card-media(:src="image.url" :contain="false" height="200px")
    v-card-title(primary-title)
      div
        .headline {{image.name}}
        span.grey--text {{dateFormat(image.lastModified)}}
    v-card-actions
      v-spacer
      v-btn(icon)
        v-icon(color="teal darken-2") share
      v-btn(icon @click.stop="removeImage()")
        v-icon(color="deep-orange darken-2") delete
</template>

<script>
import moment from 'moment'

export default {
  props: [
    'image'
  ],
  methods: {
    dateFormat(input) {
      return moment(input).format('L')
    },
    async removeImage() {
      try {
        const params = {
          email: this.$store.state.auth.authEmail,
          image: this.image.name
        }
        await this.$store.dispatch('images/REMOVE_IMAGE', params)
      } catch (err) {
        return err
      }
    }
  }
}
</script>
