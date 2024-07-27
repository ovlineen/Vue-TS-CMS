import lyRequest from '@/services'

export function postUsersListData(info: any) {
    return lyRequest.post({
        url: '/users/list',
        data: info
    })
}

export function deleteUserData(id: number) {
    return lyRequest.delete({
        url: '/users/' + id
    })
}

export function postNewUserData(info: any) {
    return lyRequest.post({
        url: '/users',
        data: info
    })
}

export function patchEditUserData(id: number, userInfo: any) {
    return lyRequest.patch({
        url: '/users/' + id,
        data: userInfo
    })
}
