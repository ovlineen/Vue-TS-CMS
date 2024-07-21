import lyRequest from '../../'

export function accountLogin(account: IAccount) {
    return lyRequest.post({
        url: '/login',
        data: account
    })
}
