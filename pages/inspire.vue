<template>
  <v-layout column align-center>
    <img src="/v.png" alt="Vuetify.js" class="mb-5">
    <blockquote>
      &#8220;First, solve the problem. Then, write the code.&#8221;
      <footer>
        <small>
          <em>&mdash;John Johnson</em>
        </small>
      </footer>
    </blockquote>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'home',
  beforeCreate () {
    return axios.get(`https://tv1voqex82.execute-api.eu-central-1.amazonaws.com/v1/images`)
  }
}
</script>
