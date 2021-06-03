import request from '@/utils/request'

const api_name = '/gmsservice/classselection'
export default{
  findAllClassByUser(page, limit, userPhoneNumber) {
    return request({
      url: `${api_name}/findAllClassByUser/${page}/${limit}`,
      method: 'post',
      data: userPhoneNumber
    })
  },
  findAllUserByClass(page, limit, classselection) {
    return request({
      url: `${api_name}/findAllUserByClass/${page}/${limit}`,
      method: 'post',
      data: classselection
    })
  },
  SelectClass(classselection) {
    return request({
      url: `${api_name}/SelectClass`,
      method: 'post',
      data: classselection
    })
  }
}
