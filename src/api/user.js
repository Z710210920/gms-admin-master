import request from '@/utils/request'

export default{
// 1教练列表(条件查询分页)
// current当前页 limit每页记录数 userQuery条件对象
  getUserListPage(current, limit, userQuery) {
    return request({
      url: `/gmsservice/user/pageUserCondition/${current}/${limit}`,
      method: 'post',
      data: userQuery
    })
  },
  getUser(id) {
    return request({
      url: `/gmsservice/user/get/${id}`,
      method: 'get'
    })
  },
  getByPhoneNumber(PhoneNumber) {
    return request({
      url: `/gmsservice/user/getByPhoneNumber/${PhoneNumber}`,
      method: 'get'
    })
  },
  getAllUser() {
    return request({
      url: `/gmsservice/user/findAll`,
      method: 'get'
    })
  },
  removeDataById(id) {
    return request({
      url: `/gmsservice/user/delete/${id}`,
      method: 'delete'
    })
  },
  save(user) {
    return request({
      url: `/gmsservice/user/save`,
      method: 'post',
      data: user
    })
  },
  update(id, user) {
    return request({
      url: `/gmsservice/user/update/${id}`,
      method: 'put',
      data: user
    })
  }
}
