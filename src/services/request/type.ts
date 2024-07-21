import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface LYInterceptors<T = AxiosResponse> {
    requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
    requestFailureFn?: (err: any) => any
    responseSuccessFn?: (config: T) => T
    responseFailureFn?: (err: any) => any
}

export interface LYRequestConfig<T = any> extends AxiosRequestConfig {
    interceptors?: LYInterceptors<T>
}
