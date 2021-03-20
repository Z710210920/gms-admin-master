import request from '@/utils/request'

export default{
// 1器材列表(条件查询分页)
// current当前页 limit每页记录数 equipmentQuery条件对象
  getEquipmentListPage(current, limit, equipmentQuery) {
    return request({
      url: `/gmsservice/equipment/pageEquipmentCondition/${current}/${limit}`,
      method: 'post',
      data: equipmentQuery
    })
  },
  getAllEquipment() {
    return request({
      url: '/gmsservice/equipment/findAll',
      method: 'get'
    })
  },
  getEquipment(id) {
    return request({
      url: `/gmsservice/equipment/get/${id}`,
      method: 'get'
    })
  },
  removeDataById(id) {
    return request({
      url: `/gmsservice/equipment/delete/${id}`,
      method: 'delete'
    })
  },
  save(equipment) {
    return request({
      url: `/gmsservice/equipment/save`,
      method: 'post',
      data: equipment
    })
  },
  update(id, equipment) {
    return request({
      url: `/gmsservice/equipment/update/${id}`,
      method: 'put',
      data: equipment
    })
  }
}
