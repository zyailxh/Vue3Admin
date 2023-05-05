const contentConfig = {
  pageName: 'category',
  header: {
    title: '类别列表',
    btnTitle: '新建数据'
  },
  propsList: [
    { align: 'center', type: 'selection', width: '55' },
    { align: 'center', type: 'index', label: '序号', width: '55' },
    {
      align: 'center',
      type: 'normal',
      prop: 'name',
      label: '类别名称',
      width: '200'
    },
    { align: 'center', type: 'timer', prop: 'createAt', label: '创建时间' },
    { align: 'center', type: 'timer', prop: 'updateAt', label: '更新时间' },
    { align: 'center', type: 'handle', label: '操作', width: '160' }
  ]
}

export default contentConfig
