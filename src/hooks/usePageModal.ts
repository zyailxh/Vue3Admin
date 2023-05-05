import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

type editType = (data?: any) => void
function usePageModal(newCallback?: editType, editCallback?: editType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewClick() {
    modalRef.value?.setModalVisIble()
    if (newCallback) newCallback()
  }
  function handleEditClick(itemData: any) {
    modalRef.value?.setModalVisIble(false, itemData)
    if (editCallback) editCallback(itemData)
  }
  return {
    modalRef,
    handleEditClick,
    handleNewClick
  }
}

export default usePageModal
