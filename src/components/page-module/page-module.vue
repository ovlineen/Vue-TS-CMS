<template>
    <el-dialog
        class="dialog"
        v-model="dialogVisible"
        :title="isNewRef ? moduleConfig.title.createTitle : moduleConfig.title.editTitle"
        width="30%"
        center
    >
        <el-form v-model="fromData" size="large" label-width="80px">
            <template v-for="item in moduleConfig.pageList" :key="item.prop">
                <el-form-item :label="item.label" :prop="item.name">
                    <el-input
                        v-model="fromData[item.name]"
                        :placeholder="item.placeholder"
                    ></el-input>
                </el-form-item>
            </template>

            <el-form-item label="选择部门" prop="parentId">
                <el-select v-model="fromData.parentId">
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

interface IProps {
    moduleConfig: {
        title: {
            createTitle: string
            editTitle: string
        }
        pageList: any[]
    }
}

const props = defineProps<IProps>()

const fromData = reactive<any>({
    name: '',
    leader: '',
    parentId: '',
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

const { entireDepartment } = storeToRefs(mainSotre)

function submitBtnClick() {
    dialogVisible.value = false
    if (!isNewRef.value && editData.value) {
        systemStore.patchPageDataAction('department', editData.value.id, fromData)
    } else {
        systemStore.newPageDataAction('department', fromData)
    }
}

defineExpose({ setModalVisble })
</script>

<style lang="scss" scoped>
.dialog {
    padding: 0 30px;
}
</style>
