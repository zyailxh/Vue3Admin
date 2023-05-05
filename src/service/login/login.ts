// import { LOGIN_TOKEN } from '@/global/constandts'
import type { IAccount } from '@/types/login'
// import { localCache } from '@/utils/cache'
import lzRequest from '..'

export function accountLogin(account: IAccount) {
  return lzRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return lzRequest.get({
    url: `/users/${id}`
    // headers: {
    //   Authorization: localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

export function getUserMenuByRoleId(id: number) {
  return lzRequest.get({
    url: `role/${id}/menu`
  })
}
