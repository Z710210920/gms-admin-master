import request from '@/utils/request'

export default{
// 1教练列表(条件查询分页)
// current当前页 limit每页记录数 coachQuery条件对象
  getCoachListPage(current, limit, coachQuery) {
    return request({
      // url:`/gmsservice/coach/pageCoachCondition/${current}/${limit}`,
      url: `/gmsservice/coach/pageCoachCondition/${current}/${limit}`,
      method: 'post',
      // coachQuery条件对象，后端使用RequestBody获取数据
      // data表示把对象转换json进行传递到接口里面
      data: coachQuery
    })
  },
  getCoach(id) {
    return request({
      url: `/gmsservice/coach/get/${id}`,
      method: 'get'
    })
  },
  removeDataById(id) {
    return request({
      url: `/gmsservice/coach/delete/${id}`,
      method: 'delete'
    })
  },
  save(coach) {
    return request({
      url: `/gmsservice/coach/save`,
      method: 'post',
      data: coach
    })
  },
  update(id, coach) {
    return request({
      url: `/gmsservice/coach/update/${id}`,
      method: 'put',
      data: coach
    })
  }
}
