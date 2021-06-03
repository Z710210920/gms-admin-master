import request from '@/utils/request'

const api_name = '/gmsservice/freefitness'
export default{
  findAllFreeFitnessMessage(page, limit, userId) {
    return request({
      url: `${api_name}/findAllFreeFitnessMessage/${page}/${limit}/${userId}`,
      method: 'post'
    })
  },
  addNewFreeFitnessMessage(userId) {
    return request({
      url: `${api_name}/addNewFreeFitnessMessage/${userId}`,
      method: 'post'
    })
  },
  stopFreeFitnessMessage(Id) {
    return request({
      url: `${api_name}/stopFreeFitnessMessage/${Id}`,
      method: 'post'
    })
  }

}
