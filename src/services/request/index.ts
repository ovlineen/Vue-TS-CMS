import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import type { LYRequestConfig } from './type'

class LYRequest {
    instance: AxiosInstance

    constructor(config: LYRequestConfig) {
        this.instance = axios.create(config)

        // 全局请求拦截
        this.instance.interceptors.request.use(
            (config) => {
                // 全局请求成功拦截
                // console.log('全局请求成功拦截')

                return config
            },
            (err) => {
                // 全局请求失败拦截
                // console.log('全局请求失败拦截')

                return err
            }
        )
        // 全局响应拦截
        this.instance.interceptors.response.use(
            (res) => {
                // console.log('全局响应成功拦截')

                return res.data
            },
            (err) => {
                // console.log('全局响应失败拦截')
                return err
            }
        )

        // 局部请求和响应拦截
        this.instance.interceptors.request.use(
            config.interceptors?.requestSuccessFn,
            config.interceptors?.requestFailureFn
        )
        this.instance.interceptors.response.use(
            config.interceptors?.responseSuccessFn,
            config.interceptors?.responseFailureFn
        )
    }

    request<T = any>(config: LYRequestConfig<T>) {
        // 单次请求拦截
        if (config.interceptors?.requestSuccessFn) {
            config = config.interceptors.requestSuccessFn(config as InternalAxiosRequestConfig)
        }

        return new Promise<T>((resolve, reject) => {
            // 单次响应拦截
            this.instance
                .request<any, T>(config)
                .then((res) => {
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

    get<T = any>(config: LYRequestConfig<T>) {
        return this.request({
            ...config,
            method: 'GET'
        })
    }

    post<T = any>(config: LYRequestConfig<T>) {
        return this.request({
            ...config,
            method: 'POST'
        })
    }

    delete<T = any>(config: LYRequestConfig<T>) {
        return this.request({
            ...config,
            method: 'Delete'
        })
    }
}

export default LYRequest
