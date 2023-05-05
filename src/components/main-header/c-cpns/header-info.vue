<template>
  <div class="header-info">
    <!-- 1.图标 -->
    <div class="operation">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><ChatLineRound /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div>

    <!-- 2.个人信息 -->
    <div class="info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <div class="user-info">
            <el-avatar
              :size="30"
              src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
            />
            <span class="name">{{ loginStore.userInfo.name }}</span>
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="hangExitClick">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constandts'
import useLoginStore from '@/store/login/login'
import { useRouter } from 'vue-router'

const router = useRouter()
function hangExitClick() {
  localStorage.removeItem(LOGIN_TOKEN)
  router.push('/login')
}
const loginStore = useLoginStore()
</script>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;
}
.operation {
  display: inline-flex;
  margin-right: 20px;
  span {
    position: relative;
    display: flex;
    width: 40px;
    height: 36px;
    justify-content: center;
    align-items: center;
    &:hover {
      background: #f2f2f2;
    }
  }

  i {
    font-size: 22px;
  }

  .dot {
    position: absolute;
    top: 3px;
    right: 3px;
    z-index: 10;
    width: 6px;
    height: 6px;
    background: red;
    border-radius: 100%;
  }
}

.info {
  .user-info {
    display: flex;
    align-items: center;
  }
  .name {
    margin-left: 10px;
  }
}

.info {
  :deep(.el-dropdown-menu__item) {
    line-height: 34px !important;
    padding: 4px 22px;
  }
}
</style>
