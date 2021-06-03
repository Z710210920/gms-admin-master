import request from '@/utils/request'

const api_name = '/gmsservice/membershipcard'
export default{
  topUp(topUpMessage) {
    return request({
      url: `${api_name}/top_up`,
      method: 'post',
      data: topUpMessage
    })
  },
  renewalcard(renewalMessage) {
    return request({
      url: `${api_name}/renewalcard`,
      method: 'post',
      data: renewalMessage
    })
  }

}
