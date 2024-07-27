<template>
    <el-dialog
        class="dialog"
        v-model="dialogVisible"
        :title="isNewRef ? '创建员工' : '编辑员工'"
        width="30%"
        center
    >
        <el-form v-model="fromData" size="large" label-width="80px">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="fromData.name" placeholder="请输入你的用户名吧"></el-input>
            </el-form-item>

            <el-form-item label="真实姓名" prop="realname">
                <el-input v-model="fromData.realname" placeholder="请输入你的真实姓名"></el-input>
            </el-form-item>

            <el-form-item v-if="isNewRef" label="密码" prop="password">
                <el-input
                    v-model="fromData.password"
                    placeholder="请输入密码"
                    show-password
                ></el-input>
            </el-form-item>

            <el-form-item label="手机号码" prop="cellphone">
                <el-input v-model="fromData.cellphone" placeholder="请输入手机号码"></el-input>
            </el-form-item>

            <el-form-item label="选择角色" prop="roleId">
                <el-select v-model="fromData.roleId">
                    <template v-for="item in entireRole" :key="item.id">
                        <el-option :label="item.name" :value="item.id" />
                    </template>
                </el-select>
            </el-form-item>

            <el-form-item label="选择部门" prop="departmentId">
                <el-select v-model="fromData.departmentId">
                    <template v-for="item in entireDepartment" :key="item.id">
                        <el-option :label="item.name" :value="item.id" />
                    </template>
                </el-select>
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <div class="dialog-footer">
                    <el-button @click="submitBtnClick" type="primary" size="large">提交</el-button>
                    <el-button @click="() => (dialogVisible = false)" size="large">
                        取消
                    </el-button>
                </div>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const dialogVisible = ref(false)
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system'
const mainSotre = useMainStore()
const isNewRef = ref(true)
const systemStore = useSystemStore()
const editData = ref()

const fromData = reactive<any>({
    name: '',
    realname: '',
    password: '',
    cellphone: '',
    roleId: '',
    departmentId: ''
})

function setModalVisble(isEdit = false, itemData?: any) {
    dialogVisible.value = true

    if (isEdit && itemData) {
        isNewRef.value = false
        for (const key in itemData) {
            fromData[key] = itemData[key]
        }
        editData.value = itemData
    } else {
        isNewRef.value = true
        editData.value = null
        for (const key in fromData) {
            fromData[key] = ''
        }
    }
}

const { entireRole, entireDepartment } = storeToRefs(mainSotre)

function submitBtnClick() {
    dialogVisible.value = false
    if (!isNewRef.value && editData.value) {
        systemStore.patchUserDataAction(editData.value.id, fromData)
    } else {
        systemStore.newUserDataAction(fromData)
    }
}

defineExpose({ setModalVisble })
</script>

<style lang="scss" scoped>
.dialog {
    padding: 0 30px;
}
</style>
