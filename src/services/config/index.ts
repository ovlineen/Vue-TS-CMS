// 区分生产环境
export let BASE_URL = ''
if (import.meta.env.DEV) {
    BASE_URL = 'http://codercba.com:5000'
} else {
    BASE_URL = 'http://codercba.com:5000'
}

export const TIME_OUT = 10000
