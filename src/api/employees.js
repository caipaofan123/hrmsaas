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