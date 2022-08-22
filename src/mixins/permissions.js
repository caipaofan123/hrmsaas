import permissionPoint from '@/constant/permissions'

export default {
    data(){
        return {
            point:permissionPoint
        }
    },
    methods: {
        isHas(point){
            return this.$store.state.permissions.points.includes(point)
          }
    },
}