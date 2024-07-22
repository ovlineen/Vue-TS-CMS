import type { IAccount } from '@/types'
import lyRequest from '../../'

export function accountLogin(account: IAccount) {
    return lyRequest.post({
        url: '/login',
        data: account
    })
}

export function getUserInfoById(id: number) {
    return lyRequest.get({
        url: `/users/${id}`
    })
}

export function getUserMenusByRoleId(id: number) {
    return lyRequest.get({
        url: `/role/${id}/menu`
    })
}
