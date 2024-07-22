import { BASE_URL, TIME_OUT } from './config'
import LYRequest from './request'

const lyRequest = new LYRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptors: {
        requestSuccessFn: (config) => {
            const token = localStorage.getItem('token')

            if (config.headers) {
                config.headers.Authorization = 'Bearer ' + token
            }
            return config
        }
    }
})

export default lyRequest
