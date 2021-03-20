import request from '@/utils/request'

export default{
// 1教练列表(条件查询分页)
// current当前页 limit每页记录数 userQuery条件对象
  getUserListPage(current, limit, userQuery) {
    return request({
      // url:`/gmsservice/user/pageUserCondition/${current}/${limit}`,
      url: `/gmsservice/user/pageUserCondition/${current}/${limit}`,
      method: 'post',
      // userQuery条件对象，后端使用RequestBody获取数据
      // data表示把对象转换json进行传递到接口里面
      data: userQuery
    })
  },
  getUser(id) {
    return request({
      url: `/gmsservice/user/get/${id}`,
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
