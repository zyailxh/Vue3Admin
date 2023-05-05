<template>
  <div class="content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button @click="handleNewUserClick" type="primary">新建部门</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="55" />
        <el-table-column align="center" type="index" label="序号" width="55" />
        <el-table-column
          align="center"
          prop="name"
          label="部门名称"
          width="120"
        />
        <el-table-column
          align="center"
          prop="leader"
          label="部门领导"
          width="120"
        />
        <el-table-column
          align="center"
          prop="parentId"
          label="上级部门"
          width="130"
        />
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
              @click="handleEditBtnClick(scope.row)"
              size="small"
              text
              type="primary"
              icon="Edit"
              >编辑</el-button
            >
            <el-button
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
        :total="pageTotalCount"
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

// 定义事件
const emit = defineEmits(['newBtnClick', 'editClick'])

// 1.发起action，请求usersList的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchPageListData()

// 2.获取userslist数据。进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 3.页码相关的逻辑
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

// 4.定义函数，用于发送网络请求
function fetchPageListData(forData: any = {}) {
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }

  // 发送网络请求
  const query = { ...info, ...forData }
  systemStore.postPageListAction('department', query)
}

// 5.删除/新建/编辑的操作
function handleDeleteClick(id: number) {
  systemStore.deletePageByIdAction('department', id)
}
function handleNewUserClick() {
  emit('newBtnClick')
}
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

defineExpose({ fetchPageListData })
</script>

<style scoped lang="less">
.content {
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
