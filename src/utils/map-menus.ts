import type { RouteRecordRaw } from 'vue-router'

export function loadLocalRoutrs() {
  // 1.获取菜单(userMenus)
  // 2.动态获取所有的路由对象，放到数组中
  const localRoutes: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )
  // 2.2将加载的对象放到localRoutes中
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }

  return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any) {
  // 1.加载本地路由
  const localRoutes = loadLocalRoutrs()

  // 2.根据菜单匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        routes.push({ path: menu.url, redirect: menu.children[0].url })
        routes.push(route)
      }

      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

/**
 *
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

interface IBreadCrumbs {
  name: string
  path: string
}
export function pamPathToBreadCrumbs(path: string, userMenus: any[]) {
  // 1.定义面包屑
  const breadCrumbs: IBreadCrumbs[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadCrumbs.push({ name: menu.name, path: menu.url })
        breadCrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadCrumbs
}

/**
 *菜单映射id列表
 * @param menuList
 */
export function mapMenuListToIds(menulist: any[]) {
  const ids: number[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menulist)
  return ids
}

// 从菜单隐射道按钮权限
export function mapMenuListToPermissions(menuList: any[]) {
  const permissions: string[] = []

  function recurseGetPermissions(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermissions(item.children ?? [])
      }
    }
  }
  recurseGetPermissions(menuList)
  return permissions
}
