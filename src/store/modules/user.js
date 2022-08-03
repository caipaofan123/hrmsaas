import { login,getUserInfo,getUserBaseInfo } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo:{}
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    logout(state){
      state.token=''
      state.userInfo={}
    }
  },
  actions: {
    async getToken(context, payload) {
      // const {data:{data}}= await login(payload)
      const data = await login(payload)

      context.commit('setToken', data)
      setTokenTime()
    },
    async getUserInfo(context) {
      // const res={name:'你真的好逗'}
      const res = await getUserInfo()
      const res1= await getUserBaseInfo(res.userId)
      context.commit('setUserInfo', {...res,...res1})
    },
    logout(context){
      context.commit('logout')
    }
  },
}
