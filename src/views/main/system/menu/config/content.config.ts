const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnTitle: '新建菜单'
  },
  propsList: [
    { align: 'center', label: '菜单名称', prop: 'name', width: '130px' },
    { align: 'center', label: '级别', prop: 'type', width: '50px' },
    { align: 'center', label: '菜单url', prop: 'url', width: '170px' },
    { align: 'center', label: '菜单icon', prop: 'icon', width: '180px' },
    { align: 'center', label: '排序', prop: 'sort', width: '50px' },
    { align: 'center', label: '权限', prop: 'permission', width: '120px' },
    { type: 'timer', align: 'center', label: '创建时间', prop: 'createAt' },
    { type: 'timer', align: 'center', label: '更新时间', prop: 'updateAt' },
    { align: 'center', type: 'handle', label: '操作', width: '160' }
  ],
  childrenTree: {
    rowKey: 'id'
  }
}

export default contentConfig
