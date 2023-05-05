import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { LZRequestConfig } from './type'

class LZRequest {
  instance: AxiosInstance

  // request实例 => axios实例
  constructor(config: LZRequestConfig) {
    this.instance = axios.create(config)

    // 每个install实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )

    // 针对特定的lzRequest实例添加拦截器
    // if(config.interceptors) {
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
    // }
  }

  //网络请求的方法
  request<T = any>(config: LZRequestConfig<T>) {
    // 单次请求成功的拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应的拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: LZRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: LZRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: LZRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: LZRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default LZRequest
