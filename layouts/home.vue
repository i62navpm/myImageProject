<template lang="pug">
  v-app
    v-toolbar(dark color="primary" app extended)
      v-toolbar-title(v-text='title')
      v-spacer
      v-tooltip(left)
        v-btn(icon='' slot="activator" @click.stop="logout()")
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
  head: {
    titleTemplate: '%s - Application',
    meta: [
      { hid: 'description', name: 'description', content: 'Application view' }
    ]
  },
  data () {
    return {
      title: 'My image project'
    }
  },
  methods: {
    logout() {
      try {
        this.$store.dispatch('auth/LOGOUT', {username: this.$store.state.auth.authEmail})
      } catch (err) {
        throw new Error(err)
      }
      this.$router.push({ name: 'index' })
    }
  }
}
</script>
