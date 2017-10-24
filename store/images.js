import axios from 'axios'

export const state = () => ({
  userImages: null
})

export const mutations = {
  SET_IMAGES: function (state, images) {
    state.userImages = images
  }
}

export const actions = {
  INIT_API({ store }, { token }) {
    this.awsService = axios.create({
      baseURL: 'https://tv1voqex82.execute-api.eu-central-1.amazonaws.com/v1/',
      headers: { 'Authorization': token }
    })
  },

  async GET_IMAGES({ commit }, { email }) {
    const images = await this.awsService.get(`images/${email}`)
    commit('SET_IMAGES', images.data)
    return images.data
  }
}
