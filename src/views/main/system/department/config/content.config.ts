const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建部门'
  },
  propsList: [
    { align: 'center', type: 'selection', width: '55' },
    { align: 'center', type: 'index', label: '序号', width: '55' },
    {
      align: 'center',
      type: 'normal',
      prop: 'name',
      label: '部门名称',
      width: '120'
    },
    {
      align: 'center',
      type: 'normal',
      prop: 'leader',
      label: '部门领导',
      width: '120'
    },
    {
      align: 'center',
      type: 'normal',
      prop: 'parentId',
      label: '上级部门',
      width: '130'
    },
    { align: 'center', type: 'timer', prop: 'createAt', label: '创建时间' },
    { align: 'center', type: 'timer', prop: 'updateAt', label: '更新时间' },
    { align: 'center', type: 'handle', label: '操作', width: '160' }
  ]
}

export default contentConfig
