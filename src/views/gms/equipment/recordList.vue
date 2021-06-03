<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="equipmentrecordQuery.equipmentId" placeholder="器材名称">
          <el-option v-for="(item,index) in equipment" :key="index" :label="item.equipmentName" :value="item.equipmentId"/>
        </el-select>
      </el-form-item>
      <el-select v-model="equipmentrecordQuery.recordType" clearable placeholder="操作类型">
        <el-option :value="1" label="入库"/>
        <el-option :value="2" label="出库"/>
        <el-option :value="3" label="借用"/>
      </el-select>
      <el-select v-model="equipmentrecordQuery.operatorType" clearable placeholder="操作员">
        <el-option :value="0" label="管理员"/>
        <el-option :value="1" label="教练"/>
        <el-option :value="2" label="用户"/>
      </el-select>
      <el-form-item>
        <el-date-picker
          v-model="equipmentrecordQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="equipmentrecordQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!--表格-->
    <el-table
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current--rows>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page-1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="equipmentName" label="器材名称" sortable align="center"/>
      <el-table-column label="操作员" sortable align="center">
        <template slot-scope="scope">
          <el-tag
            :type= "el_tag_type[scope.row.operator]"
            disable-transitions>{{ scope.row.operatorName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作类型" sortable align="center">
        <template slot-scope="scope">
          <el-tag
            :type= "el_tag_type[scope.row.recordType]"
            disable-transitions>{{ recordType[scope.row.recordType-1] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="equipmentNumber" label="数目" sortable align="center"/>
      <el-table-column prop="modifiedtime" label="日期" sortable align="center"/>
      <!--<el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button v-if=" !scope.row.isReturn && scope.row.recordType === 3" type="warning" size="mini" icon="el-icon-warning" @click="returnEquipment(scope.row.equipmentRecordId)">归还</el-button>
          <el-button v-else-if="scope.row.isReturn" type="success" size="mini" icon="el-icon-success" disabled>已归还</el-button>
        </template>
      </el-table-column>-->
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import equipmentrecord from '@/api/equipmentrecord'
import equipment from '@/api/equipment'

export default {
  data() { // 定义变量和初始值
    return {
      list: null,
      page: 1,
      limit: 10,
      total: 0,
      el_tag_type: ['success', 'info', 'warning', 'danger'],
      recordType: ['入库', '出库', '借用'],
      equipmentrecordQuery: {
      },
      equipment: {}
    }
  },
  created() { // 页面渲染之前执行，调用methods定义的方法
    this.getList()
    this.getEquipment()
  },
  methods: { // 创建具体的方法，调用coach.js定义的方法
    getList(page = 1) {
      this.page = page
      equipmentrecord.getEquipmentrecordListPage(this.page, this.limit, this.equipmentrecordQuery)
        .then(response => { // 请求成功
          // response接口返回的数据
          this.list = response.data.item
          this.total = response.data.total
        })
        .catch(error => {
          console.log((error))
        })// 请求失败
    },
    getEquipment() {
      equipment.getAllEquipment()
        .then(response => { // 请求成功
          // response接口返回的数据
          this.equipment = response.data.item
        })
        .catch(error => {
          console.log((error))
        })// 请求失败
    },
    returnEquipment(id) {
      equipmentrecord.returnEquipment(id)
        .then(response => { // 请求成功
          this.getList()
        })
        .catch(error => {
          console.log((error))
        })// 请求失败
    },
    resetData() {
      this.equipmentrecordQuery = {}
      this.getList()
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该器材, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        equipmentrecord.removeDataById(id)
          .then(response => { // 请求成功
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          })
          .catch(error => {
            console.log((error))
          })// 请求失败
      })
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>

<style scoped>

</style>
