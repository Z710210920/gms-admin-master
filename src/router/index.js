import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/coach',
    component: Layout,
    redirect: '/coach/table',
    name: '教练管理',
    meta: { title: '教练管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '教练列表',
        component: () => import('@/views/gms/coach/list'),
        meta: { title: '教练列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加教练',
        component: () => import('@/views/gms/coach/save'),
        meta: { title: '添加教练', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '编辑教练',
        component: () => import('@/views/gms/coach/save'),
        meta: { title: '编辑教练', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/table',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '用户列表',
        component: () => import('@/views/gms/user/list'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加用户',
        component: () => import('@/views/gms/user/save'),
        meta: { title: '添加用户', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '编辑用户',
        component: () => import('@/views/gms/user/save'),
        meta: { title: '编辑用户', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/course/table',
    name: '教学管理',
    meta: { title: '教学管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '课程种类列表',
        component: () => import('@/views/gms/course/list'),
        meta: { title: '课程列表', icon: 'table' }
      },
      {
        path: 'import',
        name: '导入课程',
        component: () => import('@/views/gms/course/import'),
        meta: { title: '导入课程', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '编辑课程',
        component: () => import('@/views/gms/course/save'),
        meta: { title: '编辑课程', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/classroom',
    component: Layout,
    redirect: '/classroom/table',
    name: '教室管理',
    meta: { title: '教室管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '教室列表',
        component: () => import('@/views/gms/classroom/list'),
        meta: { title: '教室列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加教室',
        component: () => import('@/views/gms/classroom/save'),
        meta: { title: '添加教室', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '编辑教室',
        component: () => import('@/views/gms/classroom/save'),
        meta: { title: '编辑教室', icon: 'tree' },
        hidden: true
      }
    ]
  },
  {
    path: '/equipment',
    component: Layout,
    redirect: '/equipment/table',
    name: '器材管理',
    meta: { title: '器材管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '器材列表',
        component: () => import('@/views/gms/equipment/list'),
        meta: { title: '器材列表', icon: 'table' }
      },
      {
        path: 'recordlist',
        name: '器材出入库记录',
        component: () => import('@/views/gms/equipment/recordlist'),
        meta: { title: '器材出入库记录', icon: 'table' }
      },
      {
        path: 'import',
        name: '导入器材',
        component: () => import('@/views/gms/equipment/import'),
        meta: { title: '导入器材', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '编辑器材',
        component: () => import('@/views/gms/equipment/save'),
        meta: { title: '编辑器材', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
