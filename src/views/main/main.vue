<template>
    <main class="main">
        <el-container class="container">
            <el-aside :width="isMenu ? '60px' : '210px'"
                ><main-menu :isFold="isMenu"></main-menu
            ></el-aside>
            <el-container>
                <el-header height="48px"
                    ><main-header @changeMenu="changeMenu"></main-header
                ></el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'

const isMenu = ref(false)
function changeMenu(isChange: boolean) {
    isMenu.value = isChange
}
</script>

<style lang="scss" scoped>
main {
    height: 100%;
    background-color: #f6f6f6;
    .el-container {
        height: 100%;
        .el-header {
            padding: 0 0;
        }
    }
}
.el-aside {
    overflow: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
        display: none;
    }
}

.el-main {
    color: #333;
    background-color: #f0f2f5;
}
</style>
