<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button v-if="isCreate" @click="handleNewUserClick" type="primary"
        >新建用户</el-button
      >
    </div>
    <div class="table">
      <el-table :data="userslist" border style="width: 100%">
        <el-table-column align="center" type="selection" width="55" />
        <el-table-column align="center" type="index" label="序号" width="55" />
        <el-table-column
          align="center"
          prop="name"
          label="用户名"
          width="110"
        />
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
          width="100"
        />
        <el-table-column
          align="center"
          prop="cellphone"
          label="手机号码"
          width="130"
        />
        <el-table-column align="center" label="状态" width="80">
          <template #default="scope">
            <el-button
              size="small"
              plain
              :type="scope.row.enable ? 'primary' : 'danger'"
              >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="{ row }">
            {{ formatUTC(row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="{ row }">
            {{ formatUTC(row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160">
          <template #default="scope">
            <el-button
              v-if="isUpdate"
              @click="handleEditBtnClick(scope.row)"
              size="small"
              text
              type="primary"
              icon="Edit"
              >编辑</el-button
            >
            <el-button
              v-if="isDelete"
              @click="handleDeleteClick(scope.row.id)"
              size="small"
              text
              type="danger"
              icon="Delete"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        :small="false"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import usePermissions from '@/hooks/usePermissions'

// 0.获取是否有对应的增删改查的权限
const isCreate = usePermissions(`users:create`)
const isDelete = usePermissions(`users:delete`)
const isUpdate = usePermissions(`users:update`)
const isQuery = usePermissions(`users:query`)

// 定义事件
const emit = defineEmits(['newBtnClick', 'editClick'])

// 1.发起action，请求usersList的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()

// 2.获取userslist数据。进行展示
const { userslist, userTotalCount } = storeToRefs(systemStore)

// 3.页码相关的逻辑
function handleSizeChange() {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}

// 4.定义函数，用于发送网络请求
function fetchUserListData(forData: any = {}) {
  if (!isQuery) return

  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }

  // 发送网络请求
  const query = { ...info, ...forData }
  systemStore.postUserListAction(query)
}

// 5.编辑和删除
function handleDeleteClick(id: number) {
  systemStore.delateUserByIdAction(id)
}
// 6.新建功能
function handleNewUserClick() {
  emit('newBtnClick')
}
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

defineExpose({ fetchUserListData })
</script>

<style scoped lang="less">
.user-content {
  background-color: #fff;
  margin-top: 20px;
  padding: 10px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
}

.table {
  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 10px;
  margin-right: 10px;
}
</style>
