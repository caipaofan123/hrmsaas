import request from '@/utils/request'
/**
 * 
 * @param {Object} data password mobile
 * @returns promise
 */
export function login(data) {
    return request({
        url:'/sys/login',
        method: 'POST',
        data
    })
}

export function getUserInfo() {
    return request({
        url:'/sys/profile',
        method: 'POST',
    })
}

export function getUserBaseInfo (id){
    return request({
        url:'/sys/user/' + id
    })
}

export function logout() {

}

/** *
 *
 * 保存员工的基本信息
 * **/
 export function saveUserDetailById(data) {
    return request({
      url: `/sys/user/${data.id}`,
      method: 'put',
      data
    })
  }