import request from '@/utils/request'

const api_name = '/gmsservice/signin'
export default{
  findAllSignInMessage(page, limit, classInfoId) {
    return request({
      url: `${api_name}/findAllSignInMessage/${page}/${limit}/${classInfoId}`,
      method: 'post'
    })
  },
  signin(signin) {
    return request({
      url: `${api_name}/signin`,
      method: 'post',
      data: signin
    })
  }

}
