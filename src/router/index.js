import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore} from '@/stores/user'
import _ from 'lodash'

const ROOT_ORDER = '订单'

const authRouter= [
  {
    path: '/register',
    meta: {
      title: '注册',
    },
    component: () => import('../views/auth/Register.vue'),
  },
  {
    path: '/login',
    meta: {
      title: '登录',
    },
    component: () => import('../views/auth/Login.vue'),
  },
  {
    path: '/forgot-password',
    meta: {
      title: '忘记密码',
    },
    component: () => import('../views/auth/ForgotPassword.vue'),
  },
  {
    path: '/reset-password',
    meta: {
      title: '重置密码',
    },
    children: [
      {
        path: ":token",
        meta: {
          title: '重置密码',
        },
        component: () => import('../views/auth/ResetPassword.vue'),
      }
    ]
  },
  {
    path: '/verify-email',
    meta: {
      title: '邮箱验证',
    },
    component: () => import('../views/auth/VerifyEmail.vue'),
  },
]

const adminRouter = [
  {
    path: '/user',
    meta: {
      title: '用户首页',
    },
    component: () => import('../views/admin/User.vue'),
  },
  {
    path: '/order',
    meta: {
      title: '订单列表',
    },
    component: () => import('../views/admin/Order.vue'),
  },
  {
    path: '/index',
    meta: {
      title: '后台首页',
    },
    component: () => import('../views/admin/Index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRouter,
    {
      // TODO: 拦截
      path: '/',
      component: () => import('../layouts/Layout.vue'),
      redirect: (to) => {

        // TODO:中转的路由

        // 登录成功后的跳转
        return {
          path: `/index`,
        }
      },
      children: [
        ...adminRouter,
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {

  // 登录放行
  if (to.path.startsWith("/login")) {
    return next()
  }

  if (to.path.startsWith("/register")) {
    return next()
  }

  // 服务类直接放行 TODO:后端code登录 只生成临时的授权信息
  if (to.path.startsWith("/third")) {
    return next()
  }

  // 页面访问
  const userStore = useUserStore()

  // 没有登录信息，跳转登录页面 双从锁定
  if (_.isEmpty(userStore.access_token)) {
    // 当前不是登录页面跳转登录页
    return next({
      path: '/index',
      query: {
        to: to.fullPath
      }
    })
  }
  next()
})

export default router
