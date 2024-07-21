/// <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const components: DefineComponent
    export default components
}
