import {
  getEntirDepartments,
  getEntireRoles,
  getEntirMenu
} from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entirMenu: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entirMenu: []
  }),
  actions: {
    async fetchEntirDataAction() {
      const rolesResult = await getEntireRoles()
      const departmentsResult = await getEntirDepartments()
      const menuResult = await getEntirMenu()

      // 保存数据
      this.entireRoles = rolesResult.data.list
      this.entireDepartments = departmentsResult.data.list
      this.entirMenu = menuResult.data.list
    }
  }
})

export default useMainStore
