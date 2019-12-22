<template>
    <div >
        <seatch></seatch>
        <tabbar></tabbar>
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
    // console.log(this.$store.state)
    // Axios({
    //   url: 'http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000008&platform_code=PLATEFORM_H5'
    // }).then(res => {
    //   this.bannerslist = res.data.banners
    // })
  },
  components: {
    tabbar,
    seatch
  }
}
</script>
<style lang="scss" scoped>
   .listbox{
  ul{
    margin-bottom:30px;
    h2{
      margin-left: 20px;
    }
  }
  h2{
    font-size: 26px;
    font-weight: normal;
  }
  li{
    box-sizing: border-box;
    position: relative;
    padding: 10px 16px;
  }
  .listcontent{
    h3{
      font-weight: normal;
    }
    position: absolute;
    bottom: 20px;
    left:30px;
    color: white;
  }
   }
</style>
