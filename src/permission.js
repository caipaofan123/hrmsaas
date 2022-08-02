import router from '@/router'
import store from '@/store'

router.beforeEach((to,from,next) => {
    const token=store.state.user.token
    const wightlist=['/login','/404']
    if (token) {
        if (to.path==='/login') {
            next('/')
        }else{
            next()
        }
    }else{
       const isCludes= wightlist.includes(to.path)
       if (isCludes) {
        next()
       }else{
        next('/login')
       }
    }
});