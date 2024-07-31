import { ref } from 'vue'

function usePageContent() {
    const contentRef = ref()
    function handelQuerySearch(searchFrom: any) {
        contentRef.value.fetchPageListData(searchFrom)
    }

    function handelReset() {
        contentRef.value.fetchPageListData()
    }

    return {
        handelQuerySearch,
        handelReset
    }
}

export default usePageContent
