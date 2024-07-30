<template>
    <div class="content">
        <div class="header">
            <h2 class="title">{{ contentConfig.header.title }}</h2>
            <el-button class="button" type="primary" @click="handelCreateBtnClick">{{
                contentConfig.header.btnTitle
            }}</el-button>
        </div>
        <el-table :data="pageList" border style="width: 100%">
            <template v-for="item in contentConfig.propsList" :key="item.prop">
                <template v-if="item.type === 'timer'">
                    <el-table-column :prop="item.prop" :label="item.label" align="center">
                        <template #default="scope">
                            {{ formatUTC(scope.row.createAt) }}
                        </template>
                    </el-table-column>
                </template>
                <template v-else-if="item.type === 'handler'">
                    <el-table-column align="center" width="150px">
                        <template #default="scope" v-bind="item">
                            <el-button @click="handelEditBtnClick(scope.row)" size="small"
                                >编辑</el-button
                            >
                            <el-button @click="handelDelectBtnClick(scope.row.id)" size="small"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </template>
                <template v-else>
                    <el-table-column v-bind="item" align="center" />
                </template>
            </template>
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

interface IProps {
    contentConfig: {
        pageName: string
        header: {
            title: string
            btnTitle: string
        }
        propsList: any[]
    }
}

const props = defineProps<IProps>()

const currentPage = ref(1)
const pagesize = ref(10)
const systemStore = usesystemStore()
systemStore.pageListDataAction(props.contentConfig.pageName)

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
    systemStore.pageListDataAction(props.contentConfig.pageName, queryInfo)
}

function handelDelectBtnClick(id: number) {
    systemStore.deletePageDataAction(props.contentConfig.pageName, id)
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
