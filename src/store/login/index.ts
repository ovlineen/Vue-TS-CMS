import { LOGIN_TOKEN } from '@/global/login'
import router from '@/router'
import { accountLogin, getUserInfoById, getUserMenusByRoleId } from '@/services/modules/login'
import type { IAccount } from '@/types'
import { mapMenusToRoutes } from '@/utils/map-menus'
import { defineStore } from 'pinia'

interface IState {
    token: string
    userInfo: any
    userMenus: any
}

const useLoginStore = defineStore('login', {
    state: (): IState => ({
        token: localStorage.getItem(LOGIN_TOKEN) ?? '',
        userInfo: {},
        userMenus: []
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
            const userMenus = userMenusRes.data
            this.userMenus = userMenus

            // 存储数据

            if (userInfo) localStorage.setItem('userInfo', JSON.stringify(userInfo))
            if (userMenus) localStorage.setItem('userMenus', JSON.stringify(userMenus))

            const routes = mapMenusToRoutes(userMenus)
            routes.forEach((route) => router.addRoute('main', route))

            // 跳转操作
            router.push('/main')
        },

        loadLocalCacheAction() {
            const token = localStorage.getItem(LOGIN_TOKEN)
            const userInfo = JSON.parse(localStorage.getItem('userInfo')!)
            const userMenus = JSON.parse(localStorage.getItem('userMenus')!)

            if (token && userInfo && userMenus) {
                this.userInfo = userInfo
                this.userMenus = userMenus

                const routes = mapMenusToRoutes(userMenus)
                routes.forEach((route) => router.addRoute('main', route))
            }
        }
    }
})

export default useLoginStore
