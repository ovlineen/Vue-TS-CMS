<template>
    <div class="main">
        main
        <button @click="handelQuitBtnClick">点击</button>
    </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/login'
import { useRouter } from 'vue-router'
const router = useRouter()
function handelQuitBtnClick() {
    localStorage.removeItem(LOGIN_TOKEN)
    router.push('/login')
}
</script>

<style lang="scss" scoped></style>
