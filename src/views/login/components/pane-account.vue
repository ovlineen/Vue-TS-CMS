<template>
    <div class="pane-account">
        <el-form :model="account" label-width="60" :rules="accountRules" ref="fromRef">
            <el-form-item label="账号" prop="name">
                <el-input v-model="account.name" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="account.password" show-password type="password" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/store/login'
import type { IAccount } from '@/types/'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

const account = reactive<IAccount>({
    name: localStorage.getItem(CACHE_NAME) ?? '',
    password: localStorage.getItem(CACHE_PASSWORD) ?? ''
})
const fromRef = ref<InstanceType<typeof ElForm>>()

// 账号登录校验规则
const accountRules: FormRules = {
    name: [
        {
            required: true,
            message: '请输入完整的账号',
            trigger: 'blur'
        },
        {
            min: 3,
            max: 12,
            message: '必须是3-12位字符',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入完整的密码',
            trigger: 'blur'
        },
        {
            min: 3,
            max: 22,
            message: '密码不能小于3位不能大于12位',
            trigger: 'blur'
        }
    ]
}

const loginStore = useLoginStore()
function loginAction(isRememberPassword: boolean) {
    fromRef.value?.validate((vaild) => {
        if (vaild) {
            loginStore.loginAccountAction({
                name: account.name,
                password: account.password
            })

            if (isRememberPassword) {
                localStorage.setItem(CACHE_NAME, account.name ?? '')
                localStorage.setItem(CACHE_PASSWORD, account.password ?? '')
            } else {
                localStorage.removeItem(CACHE_NAME)
                localStorage.removeItem(CACHE_PASSWORD)
            }
        } else {
            ElMessage.error('账号密码格式不正确')
        }
    })
}

// 暴漏子组件方法
defineExpose({
    loginAction
})
</script>

<style lang="scss" scoped></style>
