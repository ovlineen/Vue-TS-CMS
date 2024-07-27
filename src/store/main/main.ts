import { getEntireDepartments, getEntireRoles } from '@/services/modules/main/main'
import { defineStore } from 'pinia'

interface IMainStore {
    entireRole: any
    entireDepartment: any
}

const useMainStore = defineStore('main', {
    state: (): IMainStore => ({
        entireRole: {},
        entireDepartment: {}
    }),
    actions: {
        async fetchEntireDataAction() {
            const roleRes = await getEntireRoles()
            const department = await getEntireDepartments()

            this.entireRole = roleRes.data.list
            this.entireDepartment = department.data.list
        }
    }
})

export default useMainStore
