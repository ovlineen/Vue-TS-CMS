<template>
    <div class="content">
        <div class="header">
            <h2 class="title">员工列表</h2>
            <el-button class="button" type="primary" @click="handelCreateBtnClick"
                >创建员工</el-button
            >
        </div>
        <el-table :data="pageList" border style="width: 100%">
            <el-table-column type="selection" align="center" />
            <el-table-column type="index" label="序号" width="100px" align="center" />
            <el-table-column prop="name" label="名称" align="center" />
            <el-table-column prop="leader" label="部门领导" align="center" />
            <el-table-column prop="parentId" label="上级部门" align="center" />
            <el-table-column prop="createAt" label="创建时间" align="center">
                <template #default="scope">
                    {{ formatUTC(scope.row.createAt) }}
                </template>
            </el-table-column>
            <el-table-column prop="updateAt" label="更新时间" align="center">
                <template #default="scope">
                    {{ formatUTC(scope.row.updateAt) }}
                </template>
            </el-table-column>
            <el-table-column align="center" width="150px">
                <template #default="scope">
                    <el-button @click="handelEditBtnClick(scope.row)" size="small">编辑</el-button>
                    <el-button @click="handelDelectBtnClick(scope.row.id)" size="small"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pagesize"
            class="pagination"
            :page-sizes="[10, 20, 30]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagetotalCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import usesystemStore from '@/store/main/system/'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'

const currentPage = ref(1)
const pagesize = ref(10)
const systemStore = usesystemStore()
systemStore.pageListDataAction('department')

const { pageList, pagetotalCount } = storeToRefs(systemStore)

function handleSizeChange() {
    console.log('size')
}

function handleCurrentChange() {
    fetchPageListData()
}

function fetchPageListData(fromData = {}) {
    const size = pagesize.value
    const offset = (currentPage.value - 1) * size
    const pageInfo = { size, offset }

    const queryInfo = { ...pageInfo, ...fromData }
    systemStore.pageListDataAction('department', queryInfo)
}

function handelDelectBtnClick(id: number) {
    systemStore.deletePageDataAction('department', id)
    currentPage.value = 1
    pagesize.value = 10
}

function handelEditBtnClick(itemData = {}) {
    emit('clickEdit', itemData)
}

defineExpose({ fetchPageListData })

function handelCreateBtnClick() {
    emit('changeModule')
}

const emit = defineEmits(['changeModule', 'clickEdit'])
</script>

<style lang="scss" scoped>
.content {
    margin-top: 20px;
    padding: 10px;
    background-color: #fff;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
            font-size: 20px;
            font-weight: 400;
        }
    }
}

.pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
</style>
