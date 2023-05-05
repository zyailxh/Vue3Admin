<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <!-- 中间 -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="active">
        <el-tab-pane label="帐号登录" name="account">
          <template #label>
            <span class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="test">帐号登录</span>
            </span>
          </template>
          <panelAccount ref="panelRef" />
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <span class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="test">手机登录</span>
            </span>
          </template>
          <panelPhone />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部 -->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      class="btn"
      type="primary"
      size="large"
      @click="handleLoginAction"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import panelAccount from './panel-account.vue'
import panelPhone from './panel-phone.vue'
import { ref, watch } from 'vue'
import { localCache } from '@/utils/cache'

const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
const active = ref('account')
const panelRef = ref<InstanceType<typeof panelAccount>>()

watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})

function handleLoginAction() {
  if (active.value === 'account') {
    // 1.获取子组件的实例
    panelRef.value?.loginActive(isRemPwd.value)
  } else {
    console.log('用户在进行手机登录')
  }
}
</script>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 120px;
  .title {
    text-align: center;
    margin-bottom: 10px;
  }
  .tabs {
    .label {
      display: flex;
      align-items: center;
    }
    .test {
      margin-left: 5px;
    }
  }
  .controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
  }
  .btn {
    width: 100%;
    margin-top: 10px;
    // --el-button-size: 50px;
  }
}
</style>
