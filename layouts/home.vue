<template lang="pug">
  v-app
    v-navigation-drawer(persistent='', :mini-variant='miniVariant', :clipped='clipped', v-model='drawer', app='')
      v-list
        v-list-tile(router='', :to='item.to', :key='i', v-for='(item, i) in items', exact='')
          v-list-tile-action
            v-icon(v-html='item.icon')
          v-list-tile-content
            v-list-tile-title(v-text='item.title')
    v-toolbar(dark color="primary" fixed='', app='', :clipped-left='clipped' extended)
      v-toolbar-side-icon(@click='drawer = !drawer')
      v-btn(icon='', @click.stop='miniVariant = !miniVariant')
        v-icon(v-html="miniVariant ? 'chevron_right' : 'chevron_left'")
      v-btn(icon='', @click.stop='clipped = !clipped')
        v-icon web
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
      clipped: false,
      drawer: false,
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' },
        { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
      ],
      miniVariant: false,
      title: 'My image project'
    }
  }
}
</script>
