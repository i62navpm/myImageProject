<template lang="pug">
  v-container(fluid grid-list-md)
    v-layout(row wrap)
      v-flex.md4.sm6.xs12(v-for="image in getImages" :key="image.url")
        image-card(:image="image")
</template>

<script>
import ImageCard from '~/components/ImageCard.vue'
import { mapGetters } from 'vuex'

export default {
  layout: 'home',
  components: {
    ImageCard
  },
  data () {
    return {
    }
  },
  async mounted() {
    await this.$store.dispatch('images/GET_IMAGES', {email: this.$store.state.auth.authEmail})
  },
  computed: {
    ...mapGetters({
      getImages: 'images/VIEW_IMAGES'
    })
  }
}
</script>
