import request from '@/utils/request'

export default{
// 1教练列表(条件查询分页)
// current当前页 limit每页记录数 reserveQuery条件对象
  getReserveListPage(current, limit, reserveQuery) {
    return request({
      url: `/gmsservice/reserve/pageReserveCondition/${current}/${limit}`,
      method: 'post',
      data: reserveQuery
    })
  },
  cancel(id) {
    return request({
      url: `/gmsservice/reserve/cancel/${id}`,
      method: 'delete'
    })
  },
  save(reserve) {
    return request({
      url: `/gmsservice/reserve/add`,
      method: 'post',
      data: reserve
    })
  },
  update(id) {
    return request({
      url: `/gmsservice/reserve/update/${id}`,
      method: 'put'
    })
  },
  refused(id) {
    return request({
      url: `/gmsservice/reserve/refused/${id}`,
      method: 'put'
    })
  }
}
