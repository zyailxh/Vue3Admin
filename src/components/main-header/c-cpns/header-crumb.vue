<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadCrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { pamPathToBreadCrumbs } from '@/utils/map-menus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userMenus = useLoginStore().userMenu
const breadCrumbs = computed(() => {
  return pamPathToBreadCrumbs(route.path, userMenus)
})
</script>

<style scoped lang="less">
.header-crumb {
  color: #ccc;
}
</style>
