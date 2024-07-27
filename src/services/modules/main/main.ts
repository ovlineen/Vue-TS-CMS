import lyRequest from '@/services'

export function getEntireRoles() {
    return lyRequest.post({
        url: '/role/list'
    })
}

export function getEntireDepartments() {
    return lyRequest.post({
        url: 'department/list'
    })
}  
