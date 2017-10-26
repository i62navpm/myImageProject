import AWS from 'aws-sdk'
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
      baseURL: 'https://tv1voqex82.execute-api.eu-central-1.amazonaws.com/v1/images/',
      headers: { 'Authorization': token }
    })
    this.s3 = new AWS.S3()
  },

  async GET_IMAGES({ commit }, { email }) {
    const images = await this.awsService.get(email)
    commit('SET_IMAGES', images.data)
    return images.data
  },

  GET_INSTANCE({ commit }, { email }) {
    return {url: this.awsService.defaults.baseURL + email, token: this.awsService.defaults.headers.Authorization}
  },

  async UPLOAD_IMAGE({ dispatch }, { email, name, file }) {
    const params = {
      Bucket: 'my-image-project',
      Key: `${email}/${name}`,
      Body: file
    }

    await this.s3.putObject(params).promise()
  }
}
