import lzRequest from '@/service'

export function postUserData(queryInfo: any) {
  return lzRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function delateUserById(id: number) {
  return lzRequest.delete({
    url: `/users/${id}`
  })
}

export function newUserData(userInfo: any) {
  return lzRequest.post({
    url: '/users',
    data: userInfo
  })
}

export function editUserData(id: number, userInfo: any) {
  return lzRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

// 针对页面的网络请求： 增删改查
export function postPageListData(pageName: string, queryInfo: any) {
  return lzRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function delatePageById(pageName: string, id: number) {
  return lzRequest.delete({
    url: `/${pageName}/${id}`
  })
}

export function newPageData(pageName: string, pageInfo: any) {
  return lzRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}

export function editPageData(pageName: string, id: number, queryInfo: any) {
  return lzRequest.patch({
    url: `/${pageName}/${id}`,
    data: queryInfo
  })
}
