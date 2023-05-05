const contentConfig = {
  pageName: 'story',
  propsList: [
    { align: 'center', type: 'index', label: '序号', width: '55' },
    { align: 'center', type: 'normal', label: '故事标题', prop: 'title' },
    { align: 'center', type: 'normal', label: '我的故事', prop: 'content' },
    { align: 'center', type: 'timer', prop: 'createAt', label: '创建时间' }
  ]
}

export default contentConfig
