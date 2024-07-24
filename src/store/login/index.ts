import { LOGIN_TOKEN } from '@/global/login'
import router from '@/router'
import { accountLogin, getUserInfoById, getUserMenusByRoleId } from '@/services/modules/login'
import type { IAccount } from '@/types'
import { defineStore } from 'pinia'

interface IState {
    token: string
    userInfo: any
    userMenus: any
}

const useLoginStore = defineStore('login', {
    state: (): IState => ({
        token: localStorage.getItem(LOGIN_TOKEN) ?? '',
        userInfo: JSON.parse(localStorage.getItem('userInfo') ?? '{}') ?? {},
        userMenus: JSON.parse(localStorage.getItem('userMenu') ?? '[]') ?? []
    }),

    actions: {
        async loginAccountAction(account: IAccount) {
            const res = await accountLogin(account)
            const id = res.data.id
            const name = res.data.name
            this.token = res.data.token

            localStorage.setItem(LOGIN_TOKEN, this.token)

            // 在跳转前查询用户信息，判断用户的权限
            const userInfoRes = await getUserInfoById(id)
            const userInfo = userInfoRes.data
            this.userInfo = userInfo

            const userMenusRes = await getUserMenusByRoleId(id)
            const userMenu = userMenusRes.data
            this.userMenus = userMenu

            // 存储数据

            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            localStorage.setItem('userMenu', JSON.stringify(userMenu))

            // 调转操作
            router.push('/main')
        }
    }
})

export default useLoginStore
