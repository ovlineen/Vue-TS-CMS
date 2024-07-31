import { ref } from 'vue'

function usePageModule() {
    const moduleRef = ref()
    function changeModule() {
        moduleRef.value.setModalVisble()
    }

    function clickEdit(itemData: any) {
        moduleRef.value.setModalVisble(true, itemData)
    }

    return {
        changeModule,
        clickEdit
    }
}

export default usePageModule
