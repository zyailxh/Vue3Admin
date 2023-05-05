import { LOGIN_TOKEN } from '@/global/constandts'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

// 1.获取所有的路由
// const localRouter = [
//   {
//     path: '/main/analysis/overview',
//     component: () => import('../views/main/analysis/overview/overview.vue')
//   },
//   {
//     path: '/main/analysis/dashboard',
//     component: () => import('../views/main/analysis/dashboard/dashboard.vue')
//   },
//   {
//     path: '/main/system/role',
//     component: () => import('../views/main/system/role/role.vue')
//   },
//   {
//     path: '/main/system/user',
//     component: () => import('../views/main/system/user/user.vue')
//   }
// ]
// router.addRoute('main', localRouter[0])
// router.addRoute('main', localRouter[1])

// 导航守卫
router.beforeEach((to) => {
  const token = localStorage.getItem(LOGIN_TOKEN)
  if (to.path === '/main' && !token) {
    return '/login'
  }

  // 如果进入main
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
