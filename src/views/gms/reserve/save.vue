<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="用户">
        <el-select
          v-model="reserve.userId"
          placeholder="请选择用户">
          <el-option
            v-for="user in userList"
            :key="user.userId"
            :label="user.userName"
            :value="user.userId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="教练">
        <el-select
          v-model="reserve.coachId"
          placeholder="请选择教练">
          <el-option
            v-for="coach in coachList"
            :key="coach.coachId"
            :label="coach.coachName"
            :value="coach.coachId"/>
        </el-select>
      </el-form-item>
      <el-dialog
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        title="确定"
        width="30%">
        <span>是否预约，请确保账户余额充足</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveData">预 约</el-button>
        </span>
      </el-dialog>

      <el-form-item label="开始时间">
        <el-date-picker
          v-model="reserve.reserveTime"
          :default-value="new Date().getTime()+24*1000*3600"
          :picker-options="expireTimeOption"
          type="datetime"
          placeholder="选择时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>

      <el-form-item label="时长">
        <el-input-number :min="30" :max="300" v-model="reserve.duration" controls-position="right" placeholder="请填写训练的时长" @change="calculateThePrice()"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="reserve.note"/>
      </el-form-item>

      <el-form-item label="价格">
        <el-input v-model="cost" :readonly="true"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">预约</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import reserve from '@/api/reserve'
import coach from '@/api/coach'
import user from '@/api/user'

export default{
  data() {
    return {
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() < Date.now() + 24 * 60 * 60 * 1000
        }
      },
      dialogVisible: false,
      cost: 100,
      reserve: {
        duration: 30
      },
      coachList: [],
      userList: [],
      saveBtnDisabled: false, // 保存按钮是否禁用,
      imagecropperShow: false,
      imagecropperKey: 0,
      BASE_API: process.env.BASE_API
    }
  },
  watch: {
    $route(to, from) {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    close() {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    },
    cropSuccess(data) {
      this.imagecropperShow = false
      // eslint-disable-next-line no-undef
      console.log(data)
      // eslint-disable-next-line no-undef
      this.reserve.avatar = data.url
      this.imagecropperKey = this.imagecropperKey + 1
    },
    init() {
      this.getAllCoach()
      this.getAllUser()
    },
    saveOrUpdate() {
      this.dialogVisible = true
    },
    // 保存
    getAllCoach() {
      coach.getAllCoach()
        .then(response => { // 请求成功
          // response接口返回的数据
          this.coachList = response.data.item
        })
        .catch(error => {
          console.log((error))
        })// 请求失败
    },
    calculateThePrice() {
      this.cost = Math.ceil(this.reserve.duration / 30) * 100
    },
    getAllUser() {
      user.getAllUser()
        .then(response => { // 请求成功
          // response接口返回的数据
          this.userList = response.data.item
        })
        .catch(error => {
          console.log((error))
        })// 请求失败
    },
    saveData() {
      reserve.save(this.reserve)
        .then(response => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.saveBtnDisabled = true
          this.$router.push({ path: '/reserve/list' })
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          this.dialogVisible = false
          this.$message({
            type: 'error',
            message: error.data.message
          })
        })
    },
    handleClose(done) {
      this.$confirm('是否预约，请确保账户余额充足')
        .then(_ => {
          done()
        })
        .catch(_ => {
          this.dialogVisible = false
        })
    }
  }
}
</script>

<style scoped>

</style>
