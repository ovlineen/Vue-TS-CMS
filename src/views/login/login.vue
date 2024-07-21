<template>
    <div class="login">
        <LoginPanel></LoginPanel>
    </div>
</template>

<script setup lang="ts">
import LoginPanel from './components/login-panel.vue'
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-image: url('../../assets/img/login-bg.svg');
}
</style>
