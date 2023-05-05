// 针对AxiosRequestConfig配置进行·扩展·
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface LZInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}
export interface LZRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: LZInterceptors<T>
}
