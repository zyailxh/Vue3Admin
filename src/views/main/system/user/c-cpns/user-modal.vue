<template>
  <div class="user-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
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
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="isNewRef">
          <el-input
            show-password
            v-model="formData.password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item label="电话号码" prop="cellphone">
          <el-input v-model="formData.cellphone" placeholder="请输入电话号码" />
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select v-model="formData.roleId" placeholder="请选择角色">
            <template v-for="item in entireRoles" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="departmentId">
          <el-select v-model="formData.departmentId" placeholder="请选择部门">
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
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
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
const { entireRoles, entireDepartments } = storeToRefs(mainStore)

// 4.点击确定的逻辑
function handleConfirm() {
  dialogVisible.value = false
  if (isNewRef.value) {
    systemStore.newUserDataAction(formData)
  } else {
    systemStore.editUserDataAction(editData.value.id, formData)
  }
}

// 暴露属性和方法
defineExpose({ setModalVisIble })
</script>

<style scoped lang="less">
.user-modal {
  color: #ccc;
}
</style>
