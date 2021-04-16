import request from '@/utils/request'

const api_name = '/gmsservice/classchapter'
export default{
  getNestedTreeList(classId) {
    return request({
      url: `${api_name}/nested-list/${classId}`,
      method: 'get'
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  },

  save(chapter) {
    return request({
      url: api_name,
      method: 'post',
      data: chapter
    })
  },

  getById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  },

  updateById(chapter) {
    return request({
      url: `${api_name}/${chapter.id}`,
      method: 'put',
      data: chapter
    })
  }
}
