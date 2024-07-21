import { LOGIN_TOKEN } from '@/global/login'
import router from '@/router'
import { accountLogin } from '@/services/modules/login'
import type { IAccount } from '@/types'
import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
    state: () => ({
        id: '',
        token: localStorage.getItem(LOGIN_TOKEN) ?? '',
        name: ''
    }),

    actions: {
        async loginAccountAction(account: IAccount) {
            const res = await accountLogin(account)
            this.id = res.data.id
            this.token = res.data.token
            this.name = res.data.name

            // 保存 token
            localStorage.setItem(LOGIN_TOKEN, this.token)

            // 调转操作
            router.push('/main')
        }
    }
})

export default useLoginStore
