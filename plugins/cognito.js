import axios from 'axios'

export default async ({ store }) => {
  store.dispatch('auth/INIT_COGNITO')
  axios.defaults.headers.common['Authorization'] = await store.dispatch('auth/GET_USER_SESSION')
}
