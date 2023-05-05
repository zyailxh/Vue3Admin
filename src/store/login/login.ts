import { LOGIN_TOKEN } from '@/global/constandts'
import router from '@/router'
import {
  accountLogin,
  getUserInfoById,
  getUserMenuByRoleId
} from '@/service/login/login'
import type { IAccount } from '@/types/login'
import { localCache } from '@/utils/cache'
import { mapMenuListToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import { defineStore } from 'pinia'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenu: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenu: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录，获取token信息
      const loginResult = await accountLogin(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2.获取登录用户的详细信息
      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data

      // 3.根据角色请求用户的权限(菜单menu)
      const resultMenu = await getUserMenuByRoleId(this.userInfo.role.id)
      const userMenu = resultMenu.data
      this.userMenu = userMenu

      // 4.进行本地存储
      localCache.setCache('userInfo', this.userInfo)
      localCache.setCache('userMenu', this.userMenu)

      // 5.请求所有roles/depaetments数据
      const mainStore = useMainStore()
      mainStore.fetchEntirDataAction()

      // 重要：获取所有登录用户的所有按钮权限
      const permissions = mapMenuListToPermissions(userMenu)
      this.permissions = permissions

      // 重要：动态添加路由
      const routes = mapMenusToRoutes(userMenu)
      routes.forEach((route) => router.addRoute('main', route))

      // 3.页面跳转
      router.push('/main')
    },

    loadLocalCacheAction() {
      //1.用户进行默认刷新加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenu = localCache.getCache('userMenu')
      if (token && userInfo && userMenu) {
        this.token = token
        this.userInfo = userInfo
        this.userMenu = userMenu

        // 5.请求所有roles/depaetments数据
        const mainStore = useMainStore()
        mainStore.fetchEntirDataAction()

        // 重要：获取所有登录用户的所有按钮权限
        const permissions = mapMenuListToPermissions(userMenu)
        this.permissions = permissions

        // 重要：动态添加路由
        const routes = mapMenusToRoutes(userMenu)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
