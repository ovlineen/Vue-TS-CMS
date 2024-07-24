<template>
    <div class="header-vue">
        <div class="more">
            <el-icon size="18px"><Message /></el-icon>
            <el-icon size="18px"><Reading /></el-icon>
            <el-icon size="18px"><Search /></el-icon>
        </div>

        <div class="avatar">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    <el-avatar
                        src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
                        :size="32"
                    />
                    <span class="name">coderwhy</span>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>消息通知</el-dropdown-item>
                        <el-dropdown-item>账号安全</el-dropdown-item>
                        <el-dropdown-item @click="handelLogoutClick">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
function handelLogoutClick() {
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('userMenu')
    router.push('/login')
}
</script>

<style lang="scss" scoped>
.header-vue {
    display: flex;
    align-items: center;

    .more {
        margin-right: 10px;
        .el-icon {
            margin: 0 5px;
            cursor: pointer;
        }
    }

    .avatar {
        margin-left: 10px;
        .el-dropdown-link {
            display: flex;
            align-items: center;

            .name {
                cursor: pointer;
                margin-left: 10px;
            }
        }
    }
}
</style>
