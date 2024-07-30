import {
    deleteUserData,
    patchEditUserData,
    postNewUserData,
    postUsersListData,
    postPageListData,
    deletePageData,
    postNewPageData,
    patchEditPageData
} from '@/services/modules/main/system'
import { defineStore } from 'pinia'

interface IStore {
    userList: any[]
    totalCount: number
    pageList: any[]
    pagetotalCount: number
}

const useSystemStore = defineStore('system', {
    state: (): IStore => ({
        userList: [],
        totalCount: 0,
        pageList: [],
        pagetotalCount: 0
    }),
    actions: {
        async usersListDataAction(info?: any) {
            const res = await postUsersListData(info)
            const { totalCount, list } = res.data
            this.totalCount = totalCount
            this.userList = list
        },

        async deleteUserDataAction(id: number) {
            const res = await deleteUserData(id)
            this.usersListDataAction({ size: 10, offset: 0 })
        },

        newUserDataAction(info = {}) {
            postNewUserData(info).then((res) => {
                console.log(res)
                this.usersListDataAction({ size: 10, offset: 0 })
            })
        },

        patchUserDataAction(id: number, data: any) {
            patchEditUserData(id, data).then((res) => {
                console.log(res)
            })
        },

        async pageListDataAction(pathName: string, info?: any) {
            const res = await postPageListData(pathName, info)
            const { totalCount, list } = res.data
            this.pagetotalCount = totalCount
            this.pageList = list
        },

        async deletePageDataAction(pathName: string, id: number) {
            const res = await deletePageData(pathName, id)
            this.pageListDataAction(pathName, { size: 10, offset: 0 })
        },

        async newPageDataAction(pathName: any, info = {}) {
            const res = await postNewPageData(pathName, info)
            console.log(res)
            this.pageListDataAction(pathName, { size: 10, offset: 0 })
        },

        async patchPageDataAction(pathName: string, id: number, data: any) {
            const res = await patchEditPageData(pathName, id, data)
            console.log(res)
        }
    }
})

export default useSystemStore
