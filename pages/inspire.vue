<template lang="pug">
v-container(fluid grid-list-md)
  v-layout(row wrap)
    v-flex.xs6(v-for="image in images" :key="image")
      v-card
        v-card-media(:src="image" :contain="true" height="200px")
          //- v-container(fill-height fluid)
          //-   v-layout(fill-height)
          //-     v-flex(xs12 align-end flexbox)
          //-       span.headline(v-text="'Hola'")
        v-card-title(primary-title='')
          div
            .headline Top western road trips
            span.grey--text 1,000 miles of wonder

        v-card-actions
          v-spacer
          v-btn(icon='')
            v-icon favorite
          v-btn(icon='')
            v-icon bookmark
          v-btn(icon='')
            v-icon share
</template>

<script>
export default {
  layout: 'home',
  data () {
    return {
      images: []
    }
  },
  async beforeCreate() {
    this.images = await this.$store.dispatch('images/GET_IMAGES', {email: this.$store.state.auth.authEmail})
  }
}
</script>
