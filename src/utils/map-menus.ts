import router from '@/router'
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
            if (route) {
                if (!routes.find((item) => item.path === menu.url)) {
                    routes.push({ path: menu.url, redirect: route })
                }
                routes.push(route)
            }
            if (!firstMenu && route) firstMenu = subMenu
        }
    }

    return routes
}

export function mapPathToMenu(path: string, userMenus: any[]) {
    for (const menu of userMenus) {
        for (const subMenu of menu.children) {
            if (subMenu.url === path) {
                return subMenu
            }
        }
    }
    return undefined
}

interface IBreadcrumbs {
    name: string
    path: string
}

export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
    const breadcrumbs: IBreadcrumbs[] = []

    for (const menu of userMenus) {
        for (const subMenu of menu.children) {
            if (subMenu.url === path) {
                breadcrumbs.push({ name: menu.name, path: menu.url })
                breadcrumbs.push({ name: subMenu.name, path: subMenu.url })
            }
        }
    }

    return breadcrumbs
}
