const contentConfig = {
  pageName: 'goods',
  header: {
    title: '商品列表',
    btnTitle: '新建商品'
  },
  propsList: [
    { align: 'center', type: 'selection', width: '55' },
    { align: 'center', type: 'index', label: '序号', width: '55' },
    {
      align: 'center',
      type: 'normal',
      prop: 'name',
      label: '商品名称',
      width: '100'
    },
    {
      align: 'center',
      type: 'normal',
      prop: 'oldPrice',
      label: '原价格',
      width: '70'
    },
    {
      align: 'center',
      type: 'normal',
      prop: 'newPrice',
      label: '新价格',
      width: '70'
    },
    {
      align: 'center',
      type: 'normal',
      prop: 'desc',
      label: '商品描述',
      width: '110'
    },
    {
      align: 'center',
      type: 'normal',
      prop: 'status',
      label: '状态',
      width: '60'
    },
    {
      align: 'center',
      type: 'custom',
      prop: 'imgUrl',
      label: '图片',
      width: '80',
      slotName: 'parent'
    },
    {
      align: 'center',
      type: 'normal',
      prop: 'inventoryCount',
      label: '库存',
      width: '60'
    },
    {
      align: 'center',
      type: 'normal',
      prop: 'saleCount',
      label: '销量',
      width: '60'
    },
    {
      align: 'center',
      type: 'normal',
      prop: 'favorCount',
      label: '收藏',
      width: '60'
    },
    {
      align: 'center',
      type: 'normal',
      prop: 'address',
      label: '地址',
      width: '60'
    },
    { align: 'center', type: 'timer', prop: 'createAt', label: '创建时间' },
    { align: 'center', type: 'timer', prop: 'updateAt', label: '更新时间' },
    { align: 'center', type: 'handle', label: '操作', width: '160' }
  ]
}

export default contentConfig
