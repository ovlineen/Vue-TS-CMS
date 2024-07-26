<template>
    <el-form
        class="search"
        :model="searchFrom"
        abel-width="auto"
        style="max-width: 100%"
        size="large"
        ref="fromRef"
    >
        <el-row :gutter="20">
            <el-col :span="8">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="searchFrom.name" />
                </el-form-item>
            </el-col>
            <el-col :span="8"
                ><el-form-item label="真实姓名" prop="realname">
                    <el-input v-model="searchFrom.realname" />
                </el-form-item>
            </el-col>
            <el-col :span="8"
                ><el-form-item label="电话号码" prop="cellphone">
                    <el-input v-model="searchFrom.cellphone" /> </el-form-item
            ></el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="8">
                <el-form-item label="状态" prop="enable">
                    <el-select placeholder="员工状态" v-model="searchFrom.enable">
                        <el-option label="启用" :value="1" />
                        <el-option label="禁用" :value="2" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="时间筛选" prop="createAt">
                    <el-date-picker
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始"
                        end-placeholder="结束"
                        v-model="searchFrom.createAt"
                    />
                </el-form-item>
            </el-col>
        </el-row>

        <div class="btn">
            <el-button icon="Refresh" @click="handelResetClick">重置</el-button>
            <el-button icon="Search" @click="handelQuerySearch" type="primary">搜索</el-button>
        </div>
    </el-form>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import usesystemStore from '@/store/main/system/'

let searchFrom = reactive({
    name: '',
    realname: '',
    cellphone: '',
    enable: 1,
    createAt: ''
})

const fromRef = ref<InstanceType<typeof ElForm>>()
const systemStore = usesystemStore()

function handelResetClick() {
    fromRef.value?.resetFields()
    systemStore.usersListDataAction()

    emit('handelReset')
}

function handelQuerySearch() {
    emit('handelQuerySearch', searchFrom)
}

const emit = defineEmits(['handelQuerySearch', 'handelReset'])
defineExpose({ handelResetClick })
</script>

<style lang="scss" scoped>
.search {
    padding: 3%;
    box-sizing: border-box;
    background-color: #fff;

    .btn {
        display: flex;
        justify-content: right;
    }
}

.el-row {
    margin-bottom: 20px;
}

.el-form-item {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
}

::v-deep .el-form-item__content {
    margin-left: 10px;
}
</style>
