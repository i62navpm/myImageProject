<template lang="pug">
  v-card
    v-card-media(:src="image.url" :contain="true" height="200px")
    v-card-title(primary-title)
      div
        .headline {{image.name}}
        span.grey--text {{dateFormat(image.lastModified)}}
    v-card-actions
      v-spacer
      v-btn(icon)
        v-icon(color="teal darken-2") share
      v-btn(icon)
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
    }
  }
}
</script>
