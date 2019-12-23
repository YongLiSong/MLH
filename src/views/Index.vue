<template>
    <div >
        <seatch></seatch>
        <tabbar></tabbar>
        <div class="ntn_height"></div>
        <router-view></router-view>
    </div>
</template>
<script>
import Axios from 'axios'
import tabbar from '@/views/Index/Tabbar'
import seatch from '@/components/Search'

export default {
  data () {
    return {
      bannerslist: [],
      goodsList: []
    }
  },
  mounted () {

  },
  components: {
    tabbar,
    seatch
  }
}
</script>
<style lang="scss" scoped>
  .ntn_height{
    height: 4.51rem
  }
</style>
