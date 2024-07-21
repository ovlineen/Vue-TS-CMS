<template>
    <div class="login-panel">
        <h2 class="title">弘元管理系统</h2>
        <el-tabs class="tabs" type="border-card" stretch v-model="activeName">
            <el-tab-pane label="账号登录" name="account">
                <template #label>
                    <div class="label">
                        <el-icon><User /></el-icon>
                        <span class="account">账号登录</span>
                    </div>
                </template>
                <PaneAccount ref="accountRef"></PaneAccount>
            </el-tab-pane>
            <el-tab-pane label="手机登录" name="phone">
                <template #label>
                    <div class="label">
                        <el-icon><Iphone /></el-icon>
                        <span class="phone">手机登录</span>
                    </div>
                </template>
                <PanePhone></PanePhone>
            </el-tab-pane>
        </el-tabs>
        <div class="controls">
            <el-checkbox v-model="isRememberPassword" label="记住密码" size="large" />
            <el-link type="primary">忘记密码</el-link>
        </div>
        <el-button class="login-btn" type="primary" size="large" @click="handelLoginBtnClick"
            >立即登录</el-button
        >
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PanePhone from './pane-phone.vue'
import PaneAccount from './pane-account.vue'


const isRememberPassword = ref<boolean>(localStorage.getItem('isRememberPassword') === 'true')

// 监视 isRememberPassword 的变化，并将其保存到 localStorage
watch(isRememberPassword, (newValue) => {
    console.log(newValue)
    localStorage.setItem('isRememberPassword', newValue ? 'true' : 'false')
})

const activeName = ref('account')
const accountRef = ref<InstanceType<typeof PaneAccount>>()

function handelLoginBtnClick() {
    if (activeName.value === 'account') {
        accountRef.value?.loginAction(isRememberPassword.value)
    } else {
    }
}
</script>

<style lang="scss" scoped>
.login-panel {
    width: 330px;

    .title {
        display: flex;
        justify-content: center;
    }

    .tabs {
        .label {
            user-select: none;
            display: flex;
            align-items: center;
            .account {
                margin-left: 5px;
            }
        }
    }

    .controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        user-select: none;
    }

    .login-btn {
        margin-top: 10px;
        width: 100%;
    }
}
</style>
