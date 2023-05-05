const modalConfig = {
  pageName: 'role',
  header: {
    newTitle: '新建角色',
    editTitle: '编辑角色'
  },
  formItem: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入查询的角色名称'
    },
    {
      type: 'input',
      prop: 'intro',
      label: '角色介绍',
      placeholder: '请输入查询的角色介绍'
    },
    {
      type: 'custom',
      slotName: 'menulist'
    }
  ]
}

export default modalConfig
