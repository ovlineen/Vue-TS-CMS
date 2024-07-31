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
            <template v-for="item in searchConfig.formItems" :key="item.prop">
                <el-col :span="8">
                    <el-form-item :label="item.label" :prop="item.prop">
                        <template v-if="item.type === 'input'">
                            <el-input
                                v-model="searchFrom[item.prop]"
                                :placeholder="item.placeholder"
                            ></el-input>
                        </template>
                        <template v-else-if="item.type === 'date-plcker'">
                            <el-date-picker
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始"
                                end-placeholder="结束"
                                v-model="searchFrom[item.createAt]"
                            />
                        </template>
                    </el-form-item>
                </el-col>
            </template>
        </el-row>
        <div class="btn">
            <el-button icon="Refresh" @click="handelResetClick">重置</el-button>
            <el-button icon="Search" @click="handelQuerySearch" type="primary">搜索</el-button>
        </div>
    </el-form>
</template>

<script setup lang="ts">
interface IProps {
    searchConfig: {
        formItems: any[]
    }
}

import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import usesystemStore from '@/store/main/system/'
const props = defineProps<IProps>()

const searchFrom = reactive<any>({})
props.searchConfig.formItems.map((item) => (searchFrom[item.porp] = ''))

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
