import { LOGIN_TOKEN } from '@/global/constandts'
import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import LZRequest from './request'

const lzRequest = new LZRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = token
      }
      return config
    }
  }
})

export default lzRequest
