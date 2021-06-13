import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

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
  { path: '*', redirect: '/404', hidden: true }
]

export const adminRouterMap = [
  {
    path: '/coach',
    component: Layout,
    redirect: '/coach/list',
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
    path: '/reserve',
    component: Layout,
    redirect: '/reserve/table',
    name: '预约管理',
    meta: { title: '预约管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '预约列表',
        component: () => import('@/views/gms/reserve/list'),
        meta: { title: '预约列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加预约',
        component: () => import('@/views/gms/reserve/save'),
        meta: { title: '添加预约', icon: 'tree' },
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
        name: '科目种类列表',
        component: () => import('@/views/gms/course/list'),
        meta: { title: '科目列表', icon: 'table' }
      },
      {
        path: 'import',
        name: '导入科目',
        component: () => import('@/views/gms/course/import'),
        meta: { title: '导入科目', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '编辑科目',
        component: () => import('@/views/gms/course/save'),
        meta: { title: '编辑科目', noCache: true },
        hidden: true
      }
    ]
  },
  // 课程管理
  {
    path: '/class',
    component: Layout,
    redirect: '/class/list',
    name: '课程管理',
    meta: { title: '课程管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'ClassList',
        component: () => import('@/views/gms/class/list'),
        meta: { title: '课程列表' }
      },
      {
        path: 'selectClassAndSignIn/:id',
        name: 'selectClassAndSignIn',
        component: () => import('@/views/gms/class/selectClassAndSignIn'),
        meta: { title: '课程学员列表', noCache: true },
        hidden: true
      },
      {
        path: 'info',
        name: 'ClassInfo',
        component: () => import('@/views/gms/class/info'),
        meta: { title: '发布课程' }
      },
      {
        path: 'info/:id',
        name: 'ClassInfoEdit',
        component: () => import('@/views/gms/class/info'),
        meta: { title: '编辑课程基本信息', noCache: true },
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: 'ClassChapterEdit',
        component: () => import('@/views/gms/class/chapter'),
        meta: { title: '编辑课程大纲', noCache: true },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'ClassPublishEdit',
        component: () => import('@/views/gms/class/publish'),
        meta: { title: '发布课程', noCache: true },
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
    path: '/accountBook',
    component: Layout,
    redirect: '/accountBook/list',
    name: '账单中心',
    meta: { title: '账单中心', icon: 'form' },
    children: [
      {
        path: 'list_coach',
        name: 'accountBookList',
        component: () => import('@/views/gms/accountBook/list_coach'),
        meta: { title: '教练账单' }
      },
      {
        path: 'list',
        name: 'accountBookList',
        component: () => import('@/views/gms/accountBook/list'),
        meta: { title: '所有账单' }
      }
    ]
  },
  {
    path: '/fitness',
    component: Layout,
    redirect: '/fitness/list',
    name: '自由健身',
    meta: { title: '自由健身', icon: 'form' },
    children: [
      {
        path: 'list',
        name: '自由健身',
        component: () => import('@/views/gms/fitness/freeFitness'),
        meta: { title: '自由健身' }
      }
    ]
  }
]
export const coachRouterMap = [
  // 课程管理
  {
    path: '/class',
    component: Layout,
    redirect: '/class/list',
    name: '课程管理',
    meta: { title: '课程管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'ClassList',
        component: () => import('@/views/coach/class/list'),
        meta: { title: '课程列表' }
      },
      {
        path: 'selectClassAndSignIn/:id',
        name: 'selectClassAndSignIn',
        component: () => import('@/views/coach/class/selectClassAndSignIn'),
        meta: { title: '课程学员列表', noCache: true },
        hidden: true
      },
      {
        path: 'info',
        name: 'ClassInfo',
        component: () => import('@/views/coach/class/info'),
        meta: { title: '发布课程' }
      },
      {
        path: 'info/:id',
        name: 'ClassInfoEdit',
        component: () => import('@/views/coach/class/info'),
        meta: { title: '编辑课程基本信息', noCache: true },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'ClassPublishEdit',
        component: () => import('@/views/coach/class/publish'),
        meta: { title: '发布课程', noCache: true },
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
        component: () => import('@/views/coach/classroom/list'),
        meta: { title: '教室列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: '教学管理',
    meta: { title: '教学管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '科目种类列表',
        component: () => import('@/views/coach/course/list'),
        meta: { title: '科目列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/reserve',
    component: Layout,
    redirect: '/reserve/list',
    name: '预约管理',
    meta: { title: '预约管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '预约列表',
        component: () => import('@/views/coach/reserve/list'),
        meta: { title: '预约列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/accountBook',
    component: Layout,
    redirect: '/accountBook/list',
    name: '业绩管理',
    meta: { title: '业绩管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'accountBookList',
        component: () => import('@/views/coach/accountBook/list'),
        meta: { title: '业绩管理' }
      }
    ]
  },
]
export const userRouterMap = [
  {
    path: '/personal',
    component: Layout,
    redirect: '/personal/index',
    name: '个人信息',
    mate: { title: '个人信息' },
    children: [{
      path: 'index',
      name: '个人信息',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '个人信息', icon: 'table' }
    }]
  },
  {
    path: '/reserve',
    component: Layout,
    redirect: '/reserve/list',
    name: '预约管理',
    meta: { title: '预约管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '预约列表',
        component: () => import('@/views/user/reserve/list'),
        meta: { title: '预约列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加预约',
        component: () => import('@/views/user/reserve/save'),
        meta: { title: '添加预约', icon: 'tree' },
        hidden: true
      }
    ]
  },
  {
    path: '/class',
    component: Layout,
    redirect: '/class/list',
    name: '课程管理',
    meta: { title: '课程管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'ClassList',
        component: () => import('@/views/user/class/list'),
        meta: { title: '课程列表' }
      },
      {
        path: 'Mylist',
        name: 'MyClassList',
        component: () => import('@/views/user/class/myClassList'),
        meta: { title: '我的课程' }
      }
    ]
  },
  {
    path: '/accountBook',
    component: Layout,
    redirect: '/accountBook/list',
    name: '历史账单',
    meta: { title: '历史账单', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'accountBookList',
        component: () => import('@/views/user/accountBook/list'),
        meta: { title: '历史账单' }
      }
    ]
  },
  {
    path: '/fitness',
    component: Layout,
    redirect: '/fitness/list',
    name: '自由健身',
    meta: { title: '自由健身', icon: 'form' },
    children: [
      {
        path: 'list',
        name: '自由健身',
        component: () => import('@/views/user/fitness/freeFitness'),
        meta: { title: '自由健身' }
      }
    ]
  }
]

export default new Router({
  /* mode: 'hash', // 后端支持可开*/
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
