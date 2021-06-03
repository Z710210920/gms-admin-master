<template>
  <div class="app-container">
    <el-form style="text-align: center">
      <el-form-item>
        <el-button v-if="Isend" type="primary" round="true" @click="begin()">
          开始训练：50/次(会员免费)</el-button>
        <el-button v-else type="success" round="true" @click="stop()">
          结束本次训练</el-button>
      </el-form-item>
    </el-form>
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

      <el-table-column prop="id" label="订单编号" align="center"/>
      <el-table-column prop="createtime" label="开始时间" align="center"/>
      <el-table-column label="结束时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createtime === scope.row.modifiedtime ? '未结束' : ''+scope.row.modifiedtime }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import user from '@/api/user'
import freeFitness from '@/api/freeFitness'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import { mapGetters } from 'vuex'
import store from '../../../store'

export default{
  components: { ImageCropper, PanThumb },
  computed: {
    ...mapGetters([
      'Id'
    ])
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      user: {
      },
      list: [],
      edit: true,
      saveBtnDisabled: false, // 保存按钮是否禁用,
      imagecropperShow: false,
      imagecropperKey: 0,
      signinMessage: {
      },
      Isend: false,
      page: 1,
      limit: 10,
      length: [1, 3, 6, 12],
      enough: false,
      dialogChapterFormVisible: false,
      BASE_API: process.env.BASE_API,
      tip: ['月卡', '季卡', '半年卡', '年卡'],
      el_tag_type: ['warning', 'success', 'primary'],
      price: [150, 440, 880, 1770]
    }
  },
  created() {
    this.init()
  },
  methods: {
    begin() {
      freeFitness.addNewFreeFitnessMessage(this.Id).then(response => {
        this.init()
      })
    },
    stop() {
      this.$confirm('是否结束本次训练?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        freeFitness.stopFreeFitnessMessage(this.Id).then(response => {
          this.init()
        })
      })
    },
    formatTooltip(val) {
      return this.tip[val]
    },
    hidden() {
      this.dialogChapterFormVisible = false
      this.enough = false
    },
    cropSuccess(data) {
      this.imagecropperShow = false
      // eslint-disable-next-line no-undef
      console.log(data)
      // eslint-disable-next-line no-undef
      this.user.avatar = data.url
      this.imagecropperKey = this.imagecropperKey + 1
    },
    init() {
      freeFitness.findAllFreeFitnessMessage(this.page, this.limit, this.Id)
        .then(response => {
          this.list = response.data.item
          console.log(this.list)
          if (this.list === null) {
            this.Isend = true
          } else if (this.list[0].note === null) {
            this.Isend = false
          } else {
            this.Isend = true
          }
        })
    },
    saveOrUpdate() {
      user.update(this.user.userId, this.user)
        .then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.saveBtnDisabled = true
          if (this.user.userPassword !== '') {
            alert('修改了密码,请重新登录')
            store.dispatch('LogOut')
            store.dispatch('FedLogOut')
          } else {
            this.init()
          }
        })
      // eslint-disable-next-line handle-callback-err
        .catch(error => {
          this.$message({
            type: 'error',
            message: '修改失败!'
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
