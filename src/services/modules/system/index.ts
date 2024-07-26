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
