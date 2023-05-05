<template>
  <div class="department">
    <PageSearch
      :searchConfig="searchConfig"
      @query-click="handleQueryClick"
      @reset-fields="haneleResetClick"
    />
    <PageContent
      :contentConfig="contentConfig"
      ref="contentRef"
      @new-btn-click="handleNewClick"
      @edit-click="handleEditClick"
    >
    </PageContent>
    <PageModal :modal-config="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import { computed } from 'vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import useMainStore from '@/store/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 对modalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItem.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })
  return modalConfig
})
// 查
// 点击search，content的操作
const { contentRef, handleQueryClick, haneleResetClick } = usePageContent()

// 点击content, modal操作
const { modalRef, handleEditClick, handleNewClick } = usePageModal()
</script>

<style scoped lang="less">
.lerade {
  color: red;
}
</style>
