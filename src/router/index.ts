import { LOGIN_TOKEN } from '@/global/login'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),

    routes: [
        {
            path: '/',
            redirect: '/main'
        },
        {
            path: '/login',
            component: () => import('@/views/login/login.vue')
        },
        {
            path: '/main',
            component: () => import('@/views/main/main.vue')
        },
        {
            path: '/:pathMatch(.*)',
            component: () => import('../views/not-found/NouFound.vue')
        }
    ]
})

// 导航守卫
router.beforeEach((to) => {
    const token = localStorage.getItem(LOGIN_TOKEN)
    if (to.path === '/main' && !token) {
        return '/login'
    }
})


export default router
