import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import { adminRouterMap, coachRouterMap, userRouterMap, constantRouterMap } from '@/router/index'

const whiteList = ['/login', '/register'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          /* 原版代码*/
          /* next()*/
          /* 修改后的代码*/
          const roles = res.data.roles
          /* const accessedRouters = store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true })
          })*/
          const accessedRouters = accessedRouter(roles)
          console.log(router)
          router.options.routes = accessedRouters
          router.addRoutes(accessedRouters)
          next({ path: '/' })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

function accessedRouter(roles) {
  let tempRouters
  if (roles === '[admin]') {
    tempRouters = adminRouterMap.filter(k => {
      return true
    })
  } else if (roles === '[coach]') {
    tempRouters = coachRouterMap.filter(k => {
      return true
    })
  } else {
    tempRouters = userRouterMap.filter(k => {
      return true
    })
  }
  const accessedRouters = constantRouterMap.concat(tempRouters)
  sortRouters(accessedRouters)
  return accessedRouters
}

function sortRouters(accessedRouters) {
  for (let i = 0; i < accessedRouters.length; i++) {
    const router = accessedRouters[i]
    if (router.children && router.children.length > 0) {
      router.children.sort(compare('sort'))
    }
  }
  accessedRouters.sort(compare('sort'))
}
// 降序比较函数
function compare(p) {
  return function(m, n) {
    const a = m[p]
    const b = n[p]
    return b - a
  }
}
