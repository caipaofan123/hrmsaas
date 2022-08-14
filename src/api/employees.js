import request from '@/utils/request'

export function getEmployeesApi(){
    return request({
        url:'/sys/user/simple'
    })
}

export function getEmployeesListApi(params){
    return request({
        url:'/sys/user',
        params
    })
}

/**
 * 删除员工接口
 * ****/

 export function delEmployee(id) {
    return request({
      url: `/sys/user/${id}`,
      method: 'delete'
    })
  }

  /** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
    return request({
      method: 'post',
      url: '/sys/user',
      data
    })
  }

  export const importEmployees = (data) => {
    return request({
      url:'/sys/user/batch',
      method: 'POST',
      data: data
    })
  }