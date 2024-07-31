<template>
    <div class="department">
        <page-search
            :search-config="searchConfig"
            @handel-query-search="handelQuerySearch"
            @handel-reset="handelReset"
        ></page-search>
        <page-content
            :content-config="contentConfig"
            ref="contentRef"
            @change-module="changeModule"
            @click-edit="clickEdit"
        ></page-content>
        <page-module ref="moduleRef" :module-config="moduleConfig"></page-module>
    </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModule from '@/components/page-module/page-module.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import moduleConfig from './config/module.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModule from '@/hooks/usePageModule'

const { handelQuerySearch, handelReset } = usePageContent()
const { changeModule, clickEdit } = usePageModule()
</script>

<style scoped></style>
