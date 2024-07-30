<template>
    <div class="department">
        <page-search
            @handel-query-search="handelQuerySearch"
            @handel-reset="handelReset"
        ></page-search>
        <page-content
            ref="contentRef"
            @change-module="changeModule"
            @click-edit="clickEdit"
        ></page-content>
        <page-module ref="moduleRef"></page-module>
    </div>
</template>

<script setup lang="ts" name="department">
import { ref } from 'vue'
import PageSearch from './components/page-search.vue'
import PageContent from './components/page-content.vue'
import PageModule from './components/page-module.vue'

const contentRef = ref()
function handelQuerySearch(searchFrom: any) {
    contentRef.value.fetchPageListData(searchFrom)
}

function handelReset() {
    contentRef.value.fetchPageListData()
}

const moduleRef = ref()
function changeModule() {
    moduleRef.value.setModalVisble()
}

function clickEdit(itemData: any) {
    moduleRef.value.setModalVisble(true, itemData)
}
</script>

<style scoped></style>
