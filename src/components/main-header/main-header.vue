<template>
    <div class="main-header">
        <el-icon class="menu-icon" size="22" @click="handelMenuIconClick">
            <component :is="isFold ? 'Expand' : 'Fold'"></component>
        </el-icon>
        <div class="content">
            <header-breadcrumb></header-breadcrumb>
            <div class="user-info">
                <header-info></header-info>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from './components/header-info.vue'
import HeaderBreadcrumb from './components/header-breadcrumb.vue'

const isFold = ref(false)

const emit = defineEmits(['changeMenu'])

function handelMenuIconClick() {
    isFold.value = !isFold.value

    emit('changeMenu', isFold.value)
}
</script>

<style lang="scss" scoped>
.main-header {
    padding: 0 20px;
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    .menu-icon {
        cursor: pointer;
        user-select: none;
    }

    .content {
        margin-left: 10px;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .breadcrumb {
            margin-left: 10px;
        }
    }
}
</style>
