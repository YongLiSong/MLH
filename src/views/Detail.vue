<template>
    <div v-if="detailInfo">
      <listnav>
        <div class="detail_title">
            <span class="brand">{{detailInfo.brand}}</span>
            <span class="price">{{detailInfo.price}}</span>
        </div>
      </listnav>
      <swiper v-if="detailBanner.length"  class="bannerbox">
      <div class="swiper-slide" v-for="(items,index) in detailInfo.images" :key="index">

            <img :src="items.bigImgUrl">

         </div>
      </swiper>
    </div>
</template>

<script>
import Axios from 'axios'
import listnav from '@/components/Listnav'
import swiper from '@/components/Swiper'
export default {
  data () {
    return {
      detailInfo: null,
      detailBanner: []
    }
  },
  components: {
    listnav,
    swiper
  },
  mounted () {
    // console.log(this.$route.params.glsCode)
    Axios({
      url: `http://www.mei.com/appapi/product/detail/v3?categoryId=2120005100000003429&productId=${this.$route.params.glsCode}&platform_code=H5&timestamp=1577067298102&summary=b558c216920bbc762468d976457e41f3`
    }).then(res => {
      // console.log(res.data.infos)
      this.detailInfo = res.data.infos
      this.detailBanner = this.detailInfo.images
      console.log(this.detailBanner)
    })
  }
}
</script>

<style lang="scss" scoped>

  .detail_title{
    width: 100%;
    span{
      display: block;
      width: 100%;
      text-align: center;
    }
    span.price{
      color: #e14343;
    }
    span.brand{
       font-size: 0.12rem;
        color: #1d1d1d;
        font-weight: bold;
        text-transform: Uppercase;
    }
  }
  img{
    width: 100%;
  }
</style>
