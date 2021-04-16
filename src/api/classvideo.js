import request from '@/utils/request'

const api_name = '/gmsservice/classVideo'
export default{
  saveVideoInfo(classVideo) {
    return request({
      url: `${api_name}/saveVideo`,
      method: 'post',
      data: classVideo
    })
  },
  getVideoInfoById(id) {
    return request({
      url: `${api_name}/getVideo/${id}`,
      method: 'get'
    })
  },
  updateVideoInfoById(id, classVideo) {
    return request({
      url: `${api_name}/updateVideo/${id}`,
      method: 'put',
      data: classVideo
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/deleteVideo/${id}`,
      method: 'delete'
    })
  }
}
