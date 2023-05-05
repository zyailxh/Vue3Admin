const searchConfig = {
  pageName: 'users',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '用户名',
      placeholder: '请输入查询的用户名'
    },
    {
      type: 'input',
      prop: 'realname',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    },
    {
      type: 'select',
      prop: 'enable',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  ]
}

export default searchConfig
