<template>
  <div class="search">
    <el-form :model="searchName" ref="formRef" size="large" label-width="70px">
      <el-row :gutter="18">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input
              v-model="searchName.name"
              size="large"
              placeholder="请输入部门名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="leader" label="部门领导">
            <el-input
              v-model="searchName.leader"
              size="large"
              placeholder="请输入部门领导"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="createAt" label="创建时间">
            <el-date-picker
              v-model="searchName.createAt"
              size="large"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button size="large" icon="Refresh" @click="handleResetClick"
        >重置</el-button
      >
      <el-button
        @click="handleQueryClick"
        size="large"
        icon="Search"
        type="primary"
        >搜索</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

const searchName = reactive({
  name: '',
  leader: '',
  createAt: ''
})

// 1.定义自定义事件
const emit = defineEmits(['queryClick', 'resetFields'])

// 重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  formRef.value?.resetFields()
  emit('resetFields')
}
// 搜索操作
function handleQueryClick() {
  emit('queryClick', searchName)
}
</script>

<style scoped lang="less">
.search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
  }
}
</style>
