import { ref } from 'vue'
import type PageContent from '@/components/page-content/page-content.vue'
function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>()
  function handleQueryClick(queryInfo: any) {
    contentRef.value?.fetchPageListData(queryInfo)
  }
  function haneleResetClick() {
    contentRef.value?.fetchPageListData()
  }
  return {
    contentRef,
    handleQueryClick,
    haneleResetClick
  }
}

export default usePageContent
