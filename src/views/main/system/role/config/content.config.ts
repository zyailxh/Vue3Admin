const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
  },
  propsList: [
    { align: 'center', type: 'selection', width: '55' },
    { align: 'center', type: 'index', label: '序号', width: '55' },
    {
      align: 'center',
      type: 'normal',
      prop: 'name',
      label: '角色名称',
      width: '140'
    },
    {
      align: 'center',
      type: 'normal',
      prop: 'intro',
      label: '角色权限',
      width: '140'
    },
    { align: 'center', type: 'timer', prop: 'createAt', label: '创建时间' },
    { align: 'center', type: 'timer', prop: 'updateAt', label: '更新时间' },
    { align: 'center', type: 'handle', label: '操作', width: '160' }
  ]
}

export default contentConfig
