<template>
  <div class="role">
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
    <pageModal
      ref="modalRef"
      :modalConfig="modalConfig"
      :other-info="otherInfo"
    >
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entirMenu"
          :props="{ children: 'children', label: 'name' }"
          show-checkbox
          node-key="id"
          @check="handleElTreeCheck"
        />
      </template>
    </pageModal>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import type { ElTree } from 'element-plus'
import { mapMenuListToIds } from '@/utils/map-menus'

// 点击search，content的操作
const { contentRef, handleQueryClick, haneleResetClick } = usePageContent()
// 点击content, modal操作
const { modalRef, handleEditClick, handleNewClick } = usePageModal(
  newCallback,
  editCallback
)

const mainStore = useMainStore()
const { entirMenu } = storeToRefs(mainStore)
const otherInfo = ref({})
const treeRef = ref<InstanceType<typeof ElTree>>()
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}

function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
function editCallback(itemData: any) {
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style scoped lang="less"></style>
