<template>
  <div class="user-search">
    <el-form :model="searchName" ref="formRef" size="large" label-width="70px">
      <el-row :gutter="18">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="searchName.name"
              size="large"
              placeholder="请输入查询用户"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="realname" label="真实姓名">
            <el-input
              v-model="searchName.realname"
              size="large"
              placeholder="请输入真实姓名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="cellphone" label="手机号码">
            <el-input
              v-model="searchName.cellphone"
              size="large"
              placeholder="请输入手机号码"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="enable" label="状态">
            <el-select
              v-model="searchName.enable"
              size="large"
              placeholder="请输入状态"
              style="width: 100%"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="createAt" label="创建时间">
            <el-date-picker
              v-model="searchName.createAt"
              size="large"
              type="daterange"
              range-separator="To"
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
  realname: '',
  cellphone: '',
  enable: 1,
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
.user-search {
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
