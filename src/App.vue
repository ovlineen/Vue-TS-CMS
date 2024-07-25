<template>
    <el-config-provider :locale="zhCn">
        <div class="app">
            <router-view></router-view>
        </div>
    </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<style lang="scss" scoped>
.app {
    width: 100vw;
    height: 100vh;
}
</style>
