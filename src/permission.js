import router from '@/router'
import store from '@/store'

router.beforeEach(async(to, from, next) => {
  const token = store.state.user.token
  const wightlist = ['/login', '/404']
  if (token) {
    if (!store.state.user.userInfo.userId) {
      await store.dispatch('user/getUserInfo')
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    const isCludes = wightlist.includes(to.path)
    if (isCludes) {
      next()
    } else {
      next('/login')
    }
  }
})
