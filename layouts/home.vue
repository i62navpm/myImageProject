<template lang="pug">
  v-app
    v-navigation-drawer(persistent='', :mini-variant='miniVariant', :clipped='clipped', v-model='drawer', app='')
      v-list
        v-list-tile(router='', :to='item.to', :key='i', v-for='(item, i) in items', exact='')
          v-list-tile-action
            v-icon(v-html='item.icon')
          v-list-tile-content
            v-list-tile-title(v-text='item.title')
    v-toolbar(fixed='', app='', :clipped-left='clipped')
      v-toolbar-side-icon(@click='drawer = !drawer')
      v-btn(icon='', @click.stop='miniVariant = !miniVariant')
        v-icon(v-html="miniVariant ? 'chevron_right' : 'chevron_left'")
      v-btn(icon='', @click.stop='clipped = !clipped')
        v-icon web
      v-toolbar-title(v-text='title')
      v-spacer
      v-btn(icon='', @click.stop='rightDrawer = !rightDrawer')
        v-icon menu
    main
      v-content
        v-container
          nuxt
    v-navigation-drawer(temporary='', :right='right', v-model='rightDrawer', app='')
      v-list
        v-list-tile(@click.native='right = !right')
          v-list-tile-action
            v-icon(light='') compare_arrows
          v-list-tile-title Switch drawer (click me)
    v-footer(:fixed='fixed', app='')
      span © 2017

</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'My image project'
      }
    }
  }
</script>
