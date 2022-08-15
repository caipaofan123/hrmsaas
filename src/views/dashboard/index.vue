<template>
  <div class="dashboard-container">
    <div class="dashboard-text">恭喜发财</div>
    <uploadImg @onSuccess='onSuccess1' />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods:{
    onSuccess1({url}){
      console.log('发送请求'+ url);
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    background-color: gold;
  }
  &-text {
    font-size: 100px;
    line-height: 200px;
    color: hotpink;
  }
}
</style>
