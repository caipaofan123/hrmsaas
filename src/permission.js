import router , {asyncRoutes} from '@/router'
import store from '@/store'

router.beforeEach(async(to, from, next) => {
  const token = store.state.user.token
  const wightlist = ['/login', '/404']
  if (token) {
    if (!store.state.user.userInfo.userId) {
      const {roles} = await store.dispatch('user/getUserInfo')
      console.log(roles.menus);
      // console.log(asyncRoutes);
      // const routes=asyncRoutes.filter((item)=>{
      //   return roles.menus.includes(item.meta.id)
    // }
    //   ) 
    console.log(roles.points);
      await store.dispatch('permissions/filterRoutes',roles)
      await store.dispatch('permissions/setPointsAction',roles.points)
      
      next(to.path);
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
