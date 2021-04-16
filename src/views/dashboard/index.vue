<template>
  <div class="dashboard-container">
    <div class="dashboard-text">你好，亲爱的{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>
    <el-col :span="8">
      <div id="clock">
        <p class="date">{{ date }}</p>
        <p class="time">{{ time }}</p>
      </div>
    </el-col>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      date: '',
      time: '',
      week: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    }
  },
  mounted: function() { // 定时执行更新时间的方法
    const _this = this
    _this.$nextTick(function() {
      setInterval(_this.updateTime, 1000)
    })
  },

  methods: {
    // 更新时间的方法
    updateTime() {
      const _this = this
      const cd = new Date()
      // this.date;
      _this.time = _this.zeroPadding(cd.getHours(), 2) + ':' +
          _this.zeroPadding(cd.getMinutes(), 2) + ':' +
          _this.zeroPadding(cd.getSeconds(), 2)
      _this.date = _this.zeroPadding(cd.getFullYear(), 4) + '-' +
          _this.zeroPadding(cd.getMonth() + 1, 2) + '-' +
          _this.zeroPadding(cd.getDate(), 2) + ' ' +
          _this.week[cd.getDay()]
    },
    // 更新时间的辅助方法
    zeroPadding(num, digit) {
      let zero = ''
      for (let i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
