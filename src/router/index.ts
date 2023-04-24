/*
 * @author: SumO
 * @create: 2022-12-02 14:12 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2023-01-13 20:02 PM
 * @desc:
 */
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
// import NProgress from 'nprogress'
import Layout from '@/layout/index.vue'
import store from '@/store'
// import 'nprogress/nprogress.css'
import NProgress from '@/utils/loadNprogress'
Vue.use(VueRouter)
// 路由配置规则
const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Layout,
    meta: { title: '首页' },
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        // webpackChunkName 方便在webpack打包之后的调式
        component: () => import(/* webpackChunkName:'home' */'@/views/home/index.vue'),
        redirect: '/course',
        // 路由元信息
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('@/views/role/index.vue'),
        meta: { title: '角色管理', requiresAuth: true }
      },
      {
        path: '/role/:roleId/allocMenu',
        name: 'allocMenu',
        component: () => import('@/views/allocMenu/index.vue'),
        meta: { title: '角色菜单管理', requiresAuth: true },
        props: true // 将路由参数映射到组件的props 数据中
      },
      {
        path: '/role/:roleId/allocResource',
        name: 'allocResource',
        component: () => import('@/views/allocResource/index.vue'),
        meta: { title: '角色资源管理', requiresAuth: true },
        props: true
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import('@/views/menu/index.vue'),
        meta: { title: '菜单管理', requiresAuth: true }
      },
      {
        path: '/menu/menu-create',
        name: 'menu-create',
        component: () => import('@/views/menu/create.vue'),
        meta: { title: '添加菜单', requiresAuth: true }
      },
      {
        path: '/menu/:id/menu-edit',
        name: 'menu-edit',
        component: () => import('@/views/menu/edit.vue'),
        meta: { title: '编辑菜单', requiresAuth: true }
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import('@/views/resource/index.vue'),
        meta: { title: '资源管理', requiresAuth: true }
      },
      {
        path: '/classify',
        name: 'classify',
        component: () => import('@/views/resource/classify.vue'),
        meta: { title: '资源分类', requiresAuth: true }
      },
      {
        path: '/course',
        name: 'course',
        component: () => import('@/views/course/index.vue'),
        meta: { title: '课程管理', requiresAuth: true }
      },
      {
        path: '/course/course-create',
        name: 'course-create',
        component: () => import('@/views/course/course-create.vue'),
        meta: { title: '课程信息管理', requiresAuth: true },
        props: true
      },
      {
        path: '/course/:courseId/course-create',
        name: 'course-selection',
        component: () => import('@/views/course/selection.vue'),
        meta: { title: '课程内容管理', requiresAuth: true },
        props: true
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/index.vue'),
        meta: { title: '用户管理', requiresAuth: true }
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import('@/views/advert/index.vue'),
        meta: { title: '广告管理', requiresAuth: true }
      },
      {
        path: '/advertSpace',
        name: 'advertSpace',
        component: () => import('@/views/advert-space/index.vue'),
        meta: { title: '广告位管理', requiresAuth: true }
      },
      {
        path: 'video/:courseId/videoAdd',
        name: 'videoAdd',
        component: () => import('@/views/videoAdd/index.vue'),
        meta: { title: '添加视屏管理', requiresAuth: true },
        props: true
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    // 不存在页面匹配
    path: '*',
    name: '404',
    component: () => import('@/views/error-page/index.vue')
  }
]

const router = new VueRouter({
  routes
})
// 全局路由守卫
// to : 要去哪里的信息
// from: 从哪里来的信息
// next: 通信的标志 (必须使用否则无法显示页面)
router.beforeEach((to, from, next) => {
  // 不灵活(限制死了)
  // if (to.path !== '/login') {

  // }
  // 开启进度条
  NProgress.start()
  // console.log(NProgress)
  // 使用路远信息来屏蔽二级路由与三级路由的互斥
  // 可以使用meta路由元信息来判断是否登录后访问
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({
        name: 'login',
        query: { // 通过 url 传递查询字符串参数
          redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页面
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})
export default router
