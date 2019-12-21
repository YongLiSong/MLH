<template>
    <div >
        <seatch></seatch>
        <tabbar></tabbar>
        <swiper v-if="bannerslist.length" class="bannerbox">
          <div class="swiper-slide" :key="banner.id" v-for="banner in bannerslist">
                <img :src="banner.main_image" :alt="banner.main_title">
            </div>
        </swiper>
        <router-view></router-view>
    </div>
</template>
<script>
import Axios from 'axios'
import swiper from '@/components/Swiper'
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
    Axios({
      url: 'http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000008&platform_code=PLATEFORM_H5'
    }).then(res => {
      this.bannerslist = res.data.banners
    })
    Axios({
      url: 'http://www.mei.com/appapi/home/eventForH5?params=%7B%7D&timestamp=1576908856822&summary=4918472dc7fa400f732472397acb02d3&platform_code=H5'
    }).then(res => {
      // this.goodsList = res.data.
    })
  },
  components: {
    swiper,
    tabbar,
    seatch
  }
}
</script>
<style lang="scss" scoped>
    img{
        width: 100%;
    }
    .bannerbox{
        position: relative;
        top: 0;
        width: 100%;
        top:-96px;
    }
</style>
