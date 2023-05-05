<template>
  <div class="panel-ccounta">
    <el-form
      :rules="accountRules"
      :model="ruleForm"
      ref="formRef"
      label-width="60px"
      class="demo-ruleForm"
      status-icon
      size="large"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types/login'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'
// 1.定义数据
const ruleForm = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

// 2.自定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入账号信息', trigger: 'blur' },
    { min: 3, max: 15, message: '必须是3-15位长度', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    { min: 4, max: 20, message: '必须是4-20位长度', trigger: 'blur' }
  ]
}

// 3.执行账号密码
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginActive(isRemPwd: boolean) {
  formRef.value?.validate((vaild) => {
    if (vaild) {
      // 1.获取用户的账号密码
      const name = ruleForm.name
      const password = ruleForm.password

      // 2.向服务器发送网络请求(携带账号和密码)
      loginStore.loginAccountAction({ name, password }).then(() => {
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('Oops, 请输入正确的格式~~.')
    }
  })
}

defineExpose({
  loginActive
})
</script>

<style scoped lang="less">
.panel-ccounta {
  color: #ccc;
}
</style>
