<template lang="pug">
  v-app
    v-toolbar(dark color="primary" app extended)
      v-toolbar-title(v-text='title')
      v-spacer
      v-tooltip(left)
        v-btn(icon='' slot="activator")
          v-icon exit_to_app
        span Logout
      div
        upload-dialog
    main
      v-content
        v-container
          nuxt

</template>
<script>
import UploadDialog from '~/components/UploadDialog.vue'

export default {
  components: {
    UploadDialog
  },
  data () {
    return {
      title: 'My image project'
    }
  }
}
</script>
