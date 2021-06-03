import request from '@/utils/request'

const api_name = '/gmsservice/classInfo'
export default{
  saveClassInfo(classInfo) {
    return request({
      url: `${api_name}/save-class-info`,
      method: 'post',
      data: classInfo
    })
  },
  getClassInfoById(id) {
    return request({
      url: `${api_name}/getClassInfo/${id}`,
      method: 'get'
    })
  },
  updateClassInfoById(id, classinfo) {
    return request({
      url: `${api_name}/updateClassInfo/${id}`,
      method: 'put',
      data: classinfo
    })
  },

  getClassPublishInfoById(id) {
    return request({
      url: `${api_name}/classPublishInfo/${id}`,
      method: 'get'
    })
  },

  publishClass(id) {
    return request({
      url: `${api_name}/publishClass/${id}`,
      method: 'put'
    })
  },
  getPageList(page, limit, ClassInfo) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: ClassInfo
    })
  },
  getPageSelectedList(page, limit, ClassInfo) {
    return request({
      url: `${api_name}/Selected/${page}/${limit}`,
      method: 'get',
      params: ClassInfo
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/delete/${id}`,
      method: 'delete'
    })
  },
  nextPeriod(classId) {
    return request({
      url: `${api_name}/nextPeriod/${classId}`,
      method: 'post'
    })
  }
}
