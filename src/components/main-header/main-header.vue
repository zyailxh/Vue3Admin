<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="28px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">
        <headerCrumb />
      </div>
      <div class="info">
        <headerInfo />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import headerInfo from './c-cpns/header-info.vue'
import headerCrumb from './c-cpns/header-crumb.vue'

// 1.自定义事件
const emit = defineEmits(['foldChange'])
const isFold = ref(false)
function handleMenuIconClick() {
  isFold.value = !isFold.value

  emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.main-header {
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
