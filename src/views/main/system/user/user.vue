<template>
  <div class="user">
    <pageSeach
      :searchConfig="searchConfig"
      @query-click="handleQueryClick"
      @reset-fields="handleResetClick"
    />
    <userContent
      ref="contentRef"
      @new-btn-click="handlenewBtnClick"
      @edit-click="handleEditBtnClick"
    />
    <userModal ref="madalRef" />
  </div>
</template>

<script setup lang="ts">
// import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userModal from './c-cpns/user-modal.vue'
import pageSeach from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'
import { ref } from 'vue'

// 对userContent组件操作
const contentRef = ref<InstanceType<typeof userContent>>()
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

// 对madal组件的操作
const madalRef = ref<InstanceType<typeof userModal>>()
function handlenewBtnClick() {
  madalRef.value?.setModalVisIble()
}
function handleEditBtnClick(data: any) {
  madalRef.value?.setModalVisIble(false, data)
}
</script>

<style scoped lang="less">
.user {
  border-radius: 8px;
}
</style>
