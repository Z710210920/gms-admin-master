import request from '@/utils/request'

export default{
// 1教练列表(条件查询分页)
// current当前页 limit每页记录数 coachQuery条件对象
  getCourseListPage(current, limit, courseQuery) {
    return request({
      url: `/gmsservice/course/pageCourseCondition/${current}/${limit}`,
      method: 'post',
      data: courseQuery
    })
  },
  getAllCourse() {
    return request({
      url: `/gmsservice/course/findAll`,
      method: 'get'
    })
  },
  getCourse(id) {
    return request({
      url: `/gmsservice/course/get/${id}`,
      method: 'get'
    })
  },
  removeDataById(id) {
    return request({
      url: `/gmsservice/course/delete/${id}`,
      method: 'delete'
    })
  },
  save(course) {
    return request({
      url: `/gmsservice/course/save`,
      method: 'post',
      data: course
    })
  },
  update(id, course) {
    return request({
      url: `/gmsservice/course/update/${id}`,
      method: 'put',
      data: course
    })
  }
}
