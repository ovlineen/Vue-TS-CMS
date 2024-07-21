import { BASE_URL, TIME_OUT } from './config'
import LYRequest from './request'

const lyRequest = new LYRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
})

export default lyRequest
