import request from '@/utils/request'

export function login(username, password, code, uuid, roles) {
  return request({
    url: '/gmsservice/user/admin/login',
    method: 'post',
    data: {
      username,
      password,
      code,
      uuid,
      roles
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/gmsservice/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/gmsservice/user/logout',
    method: 'post'
  })
}
