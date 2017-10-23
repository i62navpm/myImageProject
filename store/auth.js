import CognitoSDK from '@/utils/cognito.service'

export const state = () => ({
  authEmail: null
})

export const mutations = {
  SET_USER: function (state, email) {
    state.authEmail = email
  }
}

export const actions = {
  INIT_COGNITO () {
    this.cognito = new CognitoSDK()
  },

  async GET_USER_SESSION ({ commit }) {
    try {
      let email = await this.cognito.getUserSession()
      commit('SET_USER', email)
    } catch (error) {
      throw new Error(error)
    }
  },

  async LOGIN ({ commit }, { username, password }) {
    try {
      let email = await this.cognito.login(username, password)
      commit('SET_USER', email)
    } catch (error) {
      throw new Error(error)
    }
  },

  async REGISTER ({ commit }, { username, password }) {
    try {
      let result = await this.cognito.register(username, password)
      commit('SET_USER', result.user.username)
      return result.userConfirmed
    } catch (error) {
      throw new Error(error)
    }
  },

  async VERIFICATE_CODE ({ state, commit }, { code }) {
    try {
      let result = await this.cognito.verificateCode({ Username: state.authEmail, code })
      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  async FORGOT_PASSWORD ({ commit }, { email }) {
    try {
      let result = await this.cognito.forgotPassword({ Username: email })
      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  async CONFIRM_PASSWORD ({ commit }, { email, code, password }) {
    try {
      let result = await this.cognito.confirmPassword({ Username: email, code, password })
      return result
    } catch (error) {
      throw new Error(error)
    }
  }
}
