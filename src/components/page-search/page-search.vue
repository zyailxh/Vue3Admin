<template>
  <div class="search" v-if="isQuery">
    <el-form :model="searchName" ref="formRef" size="large" label-width="70px">
      <el-row :gutter="18">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchName[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchName[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  size="large"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  style="width: 100%"
                  v-model="searchName[item.prop]"
                  :placeholder="item.placeholder"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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
import usePermissions from '@/hooks/usePermissions'
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

// 1.定义自定义事件/接收的属性
interface IProps {
  searchConfig: {
    pageName: string
    formItems: any[]
  }
}
const emit = defineEmits(['queryClick', 'resetFields'])
const props = defineProps<IProps>()

const isQuery = usePermissions(`${props.searchConfig.pageName}:query`)

// 2.定义form数据
const initForm: any = {}
for (const item of props.searchConfig.formItems) {
  initForm[item.prop] = ''
}
const searchName = reactive(initForm)

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
