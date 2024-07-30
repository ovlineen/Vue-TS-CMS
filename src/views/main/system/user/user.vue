<template>
    <div class="user">
        <user-search
            @handel-query-search="handelQuerySearch"
            @handel-reset="handelReset"
            ref="searchRef"
        ></user-search>
        <user-content
            ref="contentRef"
            @change-module="changeModule"
            @click-edit="clickEdit"
        ></user-content>
        <user-module ref="moduleRef"></user-module>
    </div>
</template>

<script setup lang="ts" name="user">
import { ref } from 'vue'
import userSearch from './components/user-search.vue'
import userContent from './components/user-content.vue'
import userModule from './components/user-module.vue'

const contentRef = ref<InstanceType<typeof userContent>>()
function handelQuerySearch(searchFrom: any) {
    contentRef.value?.fetchUserListData(searchFrom)
}

const searchRef = ref<InstanceType<typeof userSearch>>()
function handelReset() {}

const moduleRef = ref<InstanceType<typeof userModule>>()
function changeModule() {
    moduleRef.value?.setModalVisble()
}

function clickEdit(itemData = {}) {
    moduleRef.value?.setModalVisble(true, itemData)
}
</script>

<style scoped></style>
