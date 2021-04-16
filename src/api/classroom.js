import request from '@/utils/request'

export default{
// 1教练列表(条件查询分页)
// current当前页 limit每页记录数 classroomQuery条件对象
  getClassroomListPage(current, limit, classroomQuery) {
    return request({
      url: `/gmsservice/classroom/pageClassroomCondition/${current}/${limit}`,
      method: 'post',
      // classroomQuery条件对象，后端使用RequestBody获取数据
      // data表示把对象转换json进行传递到接口里面
      data: classroomQuery
    })
  },
  getAllClassRoom() {
    return request({
      url: `/gmsservice/classroom/findAll`,
      method: 'get'
    })
  },
  getClassroom(id) {
    return request({
      url: `/gmsservice/classroom/get/${id}`,
      method: 'get'
    })
  },
  removeDataById(id) {
    return request({
      url: `/gmsservice/classroom/delete/${id}`,
      method: 'delete'
    })
  },
  save(classroom) {
    return request({
      url: `/gmsservice/classroom/save`,
      method: 'post',
      data: classroom
    })
  },
  update(id, classroom) {
    return request({
      url: `/gmsservice/classroom/update/${id}`,
      method: 'put',
      data: classroom
    })
  }
}
