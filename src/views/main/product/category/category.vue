<template>
  <div class="category">
    <pageSearch
      :searchConfig="searchConfig"
      @query-click="handleQueryClick"
      @reset-fields="haneleResetClick"
    />
    <pageContent
      :contentConfig="contentConfig"
      ref="contentRef"
      @new-btn-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <pageModal ref="modalRef" :modalConfig="modalConfig" />
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 点击search，content的操作
const { contentRef, handleQueryClick, haneleResetClick } = usePageContent()
// 点击content, modal操作
const { modalRef, handleEditClick, handleNewClick } = usePageModal()
</script>

<style scoped lang="less"></style>
