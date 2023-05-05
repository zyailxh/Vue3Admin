import type { IModalConfig } from '@/components/page-modal/type'
const modalConfig: IModalConfig = {
  pageName: 'department',
  header: {
    newTitle: '新建部门',
    editTitle: '编辑部门'
  },
  formItem: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入查询的部门名称'
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部门领导',
      placeholder: '请输入部门领导'
    },
    {
      type: 'select',
      label: '上级部门',
      prop: 'parentId',
      placeholder: '请选择上级部门',
      options: []
    }
  ]
}

export default modalConfig
