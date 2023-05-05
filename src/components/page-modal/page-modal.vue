<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isNewRef ? modalConfig?.header.newTitle : modalConfig?.header.editTitle
      "
      width="30%"
      center
    >
      <el-form :model="formData" label-width="80px" status-icon size="large">
        <template v-for="item in modalConfig.formItem" :key="item.prop">
          <el-form-item :label="item.label" :prop="item.prop">
            <template v-if="item.type === 'input'">
              <el-input
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
              ></el-input>
            </template>
            <template v-if="item.type === 'date-picker'">
              <el-date-picker
                v-model="formData[item.prop]"
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                size="large"
              />
            </template>
            <template v-if="item.type === 'select'">
              <el-select
                style="width: 100%"
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
              >
                <template v-for="option in item.options" :key="option.value">
                  <el-option :label="option.label" :value="option.value" />
                </template>
              </el-select>
            </template>

            <template v-if="item.type === 'custom'">
              <slot :name="item.slotName"></slot>
            </template>
          </el-form-item>
        </template>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { reactive, ref } from 'vue'

// 0.定义props
interface Iprops {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItem: any[]
  }
  otherInfo?: any
}
const props = defineProps<Iprops>()

// 1.定义内部属性
const dialogVisible = ref(false)
const initialData: any = {}
for (const item of props.modalConfig.formItem) {
  initialData[item.prop] = item.initialValue ?? ''
}
const formData = reactive<any>(initialData)
const isNewRef = ref(true)
const editData = ref()

// 2.定义设置dialogVisible方法
function setModalVisIble(isNew: boolean = true, data?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && data) {
    // 编辑
    for (const key in formData) {
      formData[key] = data[key]
    }
    editData.value = data
  } else {
    // 新建
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

// 3.获取roles/departments
const systemStore = useSystemStore()

// 4.点击确定的逻辑
function handleConfirm() {
  dialogVisible.value = false
  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }

  if (isNewRef.value) {
    // 创建新的部门
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
  } else {
    systemStore.editPageDataAction(
      props.modalConfig.pageName,
      editData.value.id,
      infoData
    )
  }
}

// 暴露属性和方法
defineExpose({ setModalVisIble })
</script>

<style scoped lang="less">
.modal {
  color: #ccc;
}
</style>
