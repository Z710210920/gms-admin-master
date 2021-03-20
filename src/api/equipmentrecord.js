import request from '@/utils/request'

export default{
// 1器材列表(条件查询分页)
// current当前页 limit每页记录数 equipmentrecordQuery条件对象
  getEquipmentrecordListPage(current, limit, equipmentrecordQuery) {
    return request({
      url: `/gmsservice/equipmentrecord/pageEquipmentrecordCondition/${current}/${limit}`,
      method: 'post',
      data: equipmentrecordQuery
    })
  },
  getEquipmentrecord(id) {
    return request({
      url: `/gmsservice/equipmentrecord/get/${id}`,
      method: 'get'
    })
  },
  removeDataById(id) {
    return request({
      url: `/gmsservice/equipmentrecord/delete/${id}`,
      method: 'delete'
    })
  },
  save(equipmentrecord) {
    return request({
      url: `/gmsservice/equipmentrecord/save`,
      method: 'post',
      data: equipmentrecord
    })
  },
  update(id, equipmentrecord) {
    return request({
      url: `/gmsservice/equipmentrecord/update/${id}`,
      method: 'put',
      data: equipmentrecord
    })
  },
  returnEquipment(id) {
    return request({
      url: `/gmsservice/equipmentrecord/returnEquipment/${id}`,
      method: 'get'
    })
  }
}
