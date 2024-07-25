<template>
    <div class="header-breadcrumb">
        <el-breadcrumb separator="/">
            <template v-for="item in breadcrumbs" key="item.name">
                <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
            </template>
        </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const loginStore = useLoginStore()

const route = useRoute()
const breadcrumbs = computed(() => mapPathToBreadcrumbs(route.path, loginStore.userMenus))
</script>

<style lang="scss" scoped></style>
