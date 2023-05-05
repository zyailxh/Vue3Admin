import lzRequest from '..'

export function getEntireRoles() {
  return lzRequest.post({
    url: '/role/list'
  })
}

export function getEntirDepartments() {
  return lzRequest.post({
    url: '/department/list'
  })
}

export function getEntirMenu() {
  return lzRequest.post({
    url: '/menu/list'
  })
}
