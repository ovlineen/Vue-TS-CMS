import { deleteUserData, postUsersListData } from '@/services/modules/system'
import { defineStore } from 'pinia'

interface IStore {
    userList: any[]
    totalCount: number
}

const useSystemStore = defineStore('system', {
    state: (): IStore => ({
        userList: [],
        totalCount: 0
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
        }
    }
})

export default useSystemStore
