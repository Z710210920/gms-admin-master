import { adminRouterMap, coachRouterMap, userRouterMap, constantRouterMap } from '@/router/index'
// 判断是否有权限访问该菜单
function hasPermission(menus, route) {
  if (route.name) {
    const currMenu = getMenu(route.name, menus)
    if (currMenu != null) {
      // 设置菜单的标题、图标和可见性
      if (currMenu.title != null && currMenu.title !== '') {
        route.meta.title = currMenu.title
      }
      if (currMenu.icon != null && currMenu.title !== '') {
        route.meta.icon = currMenu.icon
      }
      if (currMenu.hidden != null) {
        route.hidden = currMenu.hidden !== 0
      }
      if (currMenu.sort != null && currMenu.sort !== '') {
        route.sort = currMenu.sort
      }
      return true
    } else {
      route.sort = 0
      if (route.hidden !== undefined && route.hidden === true) {
        return true
      } else {
        return false
      }
    }
  } else {
    return true
  }
}

// 根据路由名称获取菜单
function getMenu(name, menus) {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    if (name === menu.name) {
      return menu
    }
  }
  return null
}

// 对菜单进行排序
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

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data.roles
        let tempRouters
        if (roles == 'admin') {
          tempRouters = adminRouterMap.filter(k => {
            return true
          })
        } else if (roles == 'coach') {
          tempRouters = coachRouterMap.filter(k => {
            return true
          })
        } else {
          tempRouters = userRouterMap.filter(k => {
            return true
          })
        }
        const accessedRouters = tempRouters
        sortRouters(accessedRouters)
        return accessedRouters
        /*commit('SET_ROUTERS', accessedRouters)
        resolve()*/
      })
    }
  }
}

export default permission
