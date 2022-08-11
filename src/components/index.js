import pageTools from '@/components/pageTools'
const components = [pageTools]
export default {
    install(Vue){
        // Vue.component('pageTools',pageTools)
        components.forEach(component => {
            Vue.component(component.name,component)
        });
    }
}