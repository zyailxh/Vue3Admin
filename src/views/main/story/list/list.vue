<template>
  <div class="list">
    <pageContent :contentConfig="contentConfig" />
  </div>
</template>

<script setup lang="ts">
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
</script>

<style scoped lang="less"></style>
