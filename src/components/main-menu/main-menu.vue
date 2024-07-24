<template>
    <section class="main-menu">
        <section class="logo">
            <img class="img" src="@/assets/img/logo.svg" alt="" />
            <h1 class="title" :style="isFold ? 'display: none;' : 'display: block;'">
                弘源后台管理系统
            </h1>
        </section>

        <section class="menu">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#0c2135"
                text-color="#b7bdc3"
                active-text-color="#0a60bd"
                :collapse="isFold"
            >
                <template v-for="item in userMenus" :key="item.id">
                    <el-sub-menu :index="item.id + ''">
                        <template #title>
                            <el-icon>
                                <component :is="item.icon.split('-icon-')[1]"></component>
                            </el-icon>
                            <h2
                                class="title"
                                :style="isFold ? 'display: none;' : 'display: block;'"
                            >
                                {{ item.name }}
                            </h2>
                        </template>

                        <template v-for="subitem in item.children" :key="subitem.id">
                            <el-menu-item
                                :index="subitem.id + ''"
                                :style="isFold ? 'display: none;' : 'display: block;'"
                                @click="handelMenuItemClick(subitem)"
                            >
                                {{ subitem.name }}</el-menu-item
                            >
                        </template>
                    </el-sub-menu>
                </template>
            </el-menu>
        </section>
    </section>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login'
import { useRouter } from 'vue-router'

const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

defineProps({
    isFold: {
        type: Boolean,
        defaults: false
    }
})

const router = useRouter()
function handelMenuItemClick(item: any) {
    const url: string = item.url

    router.push(url)
}
</script>

<style lang="scss" scoped>
.main-menu {
    height: 100%;
    background-color: #001529;

    .logo {
        display: flex;
        height: 28px;
        padding: 12px 10px 8px 10px;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        .img {
            height: 100%;
            margin: 0 10px;
        }

        .title {
            font-size: 16px;
            font-weight: 700;
            color: white;
        }
    }

    .menu {
        user-select: none;
        .title {
            font-size: 16px;
        }
    }
}

.el-submenu {
    background-color: #001529 !important;
}

.el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135 !important;
}

.el-submenu__title {
    background-color: #001529 !important;
}

.el-menu-item:hover {
    color: #fff !important;
}

.el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
}

.el-menu-vertical:not(.el-menu--collapse) {
    width: 100%;
    height: calc(100% - 48px);
}
</style>
