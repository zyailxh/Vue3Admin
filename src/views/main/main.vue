<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '60px' : '200px'">
        <MainMenu :isFold="isFold" />
      </el-aside>
      <el-container>
        <el-header>
          <MainHeader @foldChange="handFoldChange" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainHeader from '@/components/main-header/main-header.vue'
import MainMenu from '@/components/main-menu/main-menu.vue'
import { ref } from 'vue'

const isFold = ref(false)
function handFoldChange(falg: boolean) {
  isFold.value = falg
}
</script>

<style scoped lang="less">
.main {
  height: 100%;
}

.main-content {
  height: 100%;
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.5s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
