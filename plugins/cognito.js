export default async ({ store }) => {
  store.dispatch('auth/INIT_COGNITO')
  try {
    const token = await store.dispatch('auth/GET_USER_SESSION')
    store.dispatch('images/INIT_API', { token })
  } catch (error) {
    return error
  }
}
