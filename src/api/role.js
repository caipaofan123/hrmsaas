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