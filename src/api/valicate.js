import request from '@/utils/request'

const api_name = '/ValicateCode'

export default{
  getVerifyCode() {
    return request({
      url: `${api_name}/getVerifyCode`,
      method: 'get'
    })
  }
}
