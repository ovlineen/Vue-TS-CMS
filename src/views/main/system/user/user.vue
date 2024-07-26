<template>
    <div class="user">
        <user-search
            @handel-query-search="handelQuerySearch"
            @handel-reset="handelReset"
            ref="searchRef"
        ></user-search>
        <user-content ref="contentRef"></user-content>
    </div>
</template>

<script setup lang="ts" name="user">
import { ref } from 'vue'
import userSearch from './components/user-search.vue'
import userContent from './components/user-cotent.vue'

const contentRef = ref<InstanceType<typeof userContent>>()
function handelQuerySearch(searchFrom: any) {
    contentRef.value?.fetchUserListData(searchFrom)
}

const searchRef = ref<InstanceType<typeof userSearch>>()
function handelReset() {}
</script>

<style scoped></style>
