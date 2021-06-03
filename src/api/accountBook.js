import request from '@/utils/request'

export default{
// 1教练列表(条件查询分页)
// current当前页 limit每页记录数 userQuery条件对象
  getUserListPage(current, limit, accountBookQuery) {
    return request({
      url: `/gmsservice/account-book/pageUserCondition/${current}/${limit}`,
      method: 'post',
      data: accountBookQuery
    })
  },
  getCoachListPage(current, limit, accountBookQuery) {
    return request({
      url: `/gmsservice/account-book/pageCoachCondition/${current}/${limit}`,
      method: 'post',
      data: accountBookQuery
    })
  }
}
