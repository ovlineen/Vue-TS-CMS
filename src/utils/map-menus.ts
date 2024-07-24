import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
    const localRoutes: RouteRecordRaw[] = []

    const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', { eager: true })

    for (const key in files) {
        const module = files[key]
        localRoutes.push(module.default)
    }

    return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
    const localRoutes = loadLocalRoutes()
    const routes: RouteRecordRaw[] = []

    for (const menu of userMenus) {
        for (const subMenu of menu.children) {
            const route = localRoutes.find((item) => item.path === subMenu.url)
            if (route) routes.push(route)
            if (firstMenu === null && route) firstMenu = route
        }
    }

    return routes
}
