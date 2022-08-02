import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: '',
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
  },
  actions: {
    async getToken(context, payload) {
      // const {data:{data}}= await login(payload)
      const data = await login(payload)

      context.commit('setToken', data)
    },
  },
}
