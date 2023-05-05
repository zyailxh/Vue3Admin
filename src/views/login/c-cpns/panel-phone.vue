<template>
  <div class="panel-phone">
    <el-form
      ref="ruleFormRef"
      label-width="60px"
      class="demo-ruleForm"
      status-icon
      size="large"
    >
      <el-form-item label="手机号">
        <el-input />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input show-password />
          <el-button class="btn" type="primary"> 获取验证码 </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.panel-phone {
  color: #ccc;
  .verify-code {
    display: flex;
    .btn {
      margin-left: 8px;
    }
  }
}
</style>
