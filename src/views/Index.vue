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
<<<<<<< HEAD
  .ntn_height{
    height: 4.51rem
=======
   .listbox{
  ul{
    margin-bottom:0.30rem;
    h2{
      margin-left: 0.20rem;
    }
  }
  h2{
    font-size: 0.26rem;
    font-weight: normal;
  }
  li{
    box-sizing: border-box;
    position: relative;
    padding: 0.10rem 0.16rem;
  }
  .listcontent{
    h3{
      font-weight: normal;
    }
    position: absolute;
    bottom: 0.20rem;
    left:0.30rem;
    color: white;
>>>>>>> 69bc85e7dab323d14aa69c10dac3480caaec1aaf
  }
</style>
