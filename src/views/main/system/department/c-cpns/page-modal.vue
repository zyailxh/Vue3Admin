<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <el-form
        :model="formData"
        ref="ruleFormRef"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
        size="large"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input v-model="formData.leader" placeholder="请输入部门领导" />
        </el-form-item>
        <el-form-item label="选择部门" prop="parentId">
          <el-select v-model="formData.parentId" placeholder="请选择部门">
            <template v-for="item1 in entireDepartments" :key="item1.id">
              <el-option :label="item1.name" :value="item1.id" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

const dialogVisible = ref(false)
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})
const isNewRef = ref(true)
const editData = ref()

// 2.定义设置dialogVisible方法
function setModalVisIble(isNew: boolean = true, data?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && data) {
    // 编辑
    for (const key in formData) {
      formData[key] = data[key]
    }
    editData.value = data
  } else {
    // 新建
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

// 3.获取roles/departments
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireDepartments } = storeToRefs(mainStore)

// 4.点击确定的逻辑
function handleConfirm() {
  dialogVisible.value = false
  if (isNewRef.value) {
    // 创建新的部门
    systemStore.newPageDataAction('department', formData)
  } else {
    systemStore.editPageDataAction('department', editData.value.id, formData)
  }
}

// 暴露属性和方法
defineExpose({ setModalVisIble })
</script>

<style scoped lang="less">
.modal {
  color: #ccc;
}
</style>
