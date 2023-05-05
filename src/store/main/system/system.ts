import {
  delatePageById,
  delateUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUserData
} from '@/service/main/system'
import { defineStore } from 'pinia'
import useMainStore from '../main'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userslist: [],
    userTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const userListResult = await postUserData(queryInfo)
      const { totalCount, list } = userListResult.data
      this.userslist = list
      this.userTotalCount = totalCount
    },
    // 删除
    async delateUserByIdAction(id: number) {
      // 1.删除数据操作
      await delateUserById(id)

      // 2.重新请求新的数据
      this.postUserListAction({ offset: 0, size: 10 })
    },
    // 新建
    async newUserDataAction(userInfo: any) {
      // 1.创建用户
      await newUserData(userInfo)

      // 2.重新请求新的数据
      this.postUserListAction({ offset: 0, size: 10 })

      // 3.获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntirDataAction()
    },
    // 编辑
    async editUserDataAction(id: number, userInfo: any) {
      // 编辑用户
      await editUserData(id, userInfo)

      // 2.重新请求新的数据
      this.postUserListAction({ offset: 0, size: 10 })

      // 3.获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntirDataAction()
    },

    // 针对页面的数据，增删改查
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      // 1.删除数据操作
      await delatePageById(pageName, id)

      // 2.重新请求新的数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 3.获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntirDataAction()
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      // 1.创建部门
      await newPageData(pageName, pageInfo)

      // 2.重新请求新的数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 3.获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntirDataAction()
    },
    async editPageDataAction(pageName: string, id: number, queryInfo: any) {
      // 编辑部门
      await editPageData(pageName, id, queryInfo)

      // 2.重新请求新的数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 3.获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntirDataAction()
    }
  }
})

export default useSystemStore
