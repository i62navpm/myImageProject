import axios from 'axios'

export const state = () => ({
  userImages: null
})

export const getters = {
  VIEW_IMAGES: function (state) {
    return state.userImages || []
  }
}

export const mutations = {
  SET_IMAGES: function (state, images) {
    state.userImages = images
  },
  REMOVE_IMAGE: function (state, image) {
    state.userImages = state.userImages.filter(item => item.name !== image)
  }
}

export const actions = {
  INIT_API({ store }, { token }) {
    this.awsService = axios.create({
      baseURL: 'https://tv1voqex82.execute-api.eu-central-1.amazonaws.com/v1/images/',
      headers: { 'Authorization': token }
    })
  },

  async GET_IMAGES({ commit }, { email }) {
    const images = await this.awsService.get(email)
    commit('SET_IMAGES', images.data)
    return images.data
  },

  GET_INSTANCE({ commit }, { email }) {
    return {url: this.awsService.defaults.baseURL + email, token: this.awsService.defaults.headers.Authorization}
  },

  UPLOAD_IMAGE({ dispatch }, { email, name, file, config }) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        const params = {
          Bucket: 'my-image-project',
          Key: name,
          Body: reader.result
        }
        try {
          resolve(await this.awsService.post(email, params, config))
        } catch (err) {
          reject(new Error(err))
        }
      }
    })
  },
  async REMOVE_IMAGE({ commit }, { email, image }) {
    const data = {
      Bucket: 'my-image-project',
      Key: `${email}/thumbnails/${image}`
    }
    try {
      await this.awsService.delete(email, {data})
      commit('REMOVE_IMAGE', image)
    } catch (err) {
      throw new Error(err)
    }
  }
}
