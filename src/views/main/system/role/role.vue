<template>
    <div class="role">
        <page-search
            :search-config="searchConfig"
            @handel-query-search="handelQuerySearch"
            @handel-reset="handelReset"
        ></page-search>
        <page-content
            :content-config="contentConfig"
            @change-module="changeModule"
            @click-edit="clickEdit"
        ></page-content>

        <page-module :module-config="moduleConfig"></page-module>
    </div>
</template>

<script setup lang="ts" name="role">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModule from '@/components/page-module/page-module.vue'
import usePageModule from '@/hooks/usePageModule'
import usePageContent from '@/hooks/usePageContent'

import contentConfig from './config/content.config'
import searchConfig from './config/search.config'
import moduleConfig from './config/module.config'

const { changeModule, clickEdit } = usePageModule()
const { handelQuerySearch, handelReset } = usePageContent()
</script>

<style scoped></style>
