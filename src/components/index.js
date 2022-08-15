import pageTools from '@/components/pageTools'
import uploadImg from '@/components/UploadImg'
const components = [pageTools,uploadImg]
export default {
    install(Vue){
        // Vue.component('pageTools',pageTools)
        components.forEach(component => {
            Vue.component(component.name,component)
        });
    }
}