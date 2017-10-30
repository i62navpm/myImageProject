<template lang="pug">
  v-app
    main
      v-content
        v-container(fill-height)
          nuxt
</template>

<script>
export default {
  head: {
    titleTemplate: '%s - Authentication',
    meta: [
      { hid: 'description', name: 'description', content: 'Auth views' }
    ]
  }
}
</script>
<style>

</style>
