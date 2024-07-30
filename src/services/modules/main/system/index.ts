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

export function postPageListData(pathName: string, info: any) {
    return lyRequest.post({
        url: `/${pathName}/list`,
        data: info
    })
}

export function deletePageData(pathName: string, id: number) {
    return lyRequest.delete({
        url: `/${pathName}/${id}`
    })
}

export function postNewPageData(pathName: string, info: any) {
    return lyRequest.post({
        url: `/${pathName}`,
        data: info
    })
}

export function patchEditPageData(pathName: string, id: number, userInfo: any) {
    return lyRequest.patch({
        url: `/${pathName}/${id}`,
        data: userInfo
    })
}
