import request from '@/utils/request'

const api_name = '/gmsservice/classInfo'
export default{
  saveClassInfo(classInfo) {
    return request({
      url: `${api_name}/save-class-info`,
      method: 'post',
      data: classInfo
    })
  }
}
