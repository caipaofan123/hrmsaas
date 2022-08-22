import request from '@/utils/request'

export const getRolesApi = (params) => {
  return request({
    url: '/sys/role',
    params,
  })
}

export const addRolesApi = (data) =>{
    return request({
        url: '/sys/role',
        method: 'POST',
        data: data
    })
}

export function getRolesInfo(id){
  return request({
    url: '/sys/role/'+id
  })
}


// 给角色分配权限
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}